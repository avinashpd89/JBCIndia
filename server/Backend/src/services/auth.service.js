import {
  SignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
  ConfirmSignUpCommand,
  UpdateUserAttributesCommand,
  GetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";

import axios from "axios";
import jwt from "jsonwebtoken";
import { cognito } from "../utils/cognito.js";
import { generateSecretHash } from "../utils/generateSecretHash.js";

/* ========================================================================
    TEMP PASSWORD GENERATOR
======================================================================== */
const generateTempPassword = () => {
  const randomStr = Math.random().toString(36).slice(2);
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `P@${randomStr}${randomNum}X!`;
};

// In-memory store for temp passwords (in production, use Redis)
const tempPasswordStore = {};

/* ========================================================================
    EMAIL OTP LOGIN
======================================================================== */
export const emailOtpService = async (email) => {
  const username = email.toLowerCase();
  const tempPassword = generateTempPassword();
  tempPasswordStore[username] = tempPassword;

  try {
    console.log(`Attempting SignUp for ${username}`);
    // 1. Try to create new user
    await cognito.send(
      new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        SecretHash: generateSecretHash(username),
        Username: username,
        Password: tempPassword,
        UserAttributes: [{ Name: "email", Value: email }],
      })
    );
    console.log("SignUp successful, OTP sent.");
    // If successful, Cognito sends verification code to email
    return { message: "OTP sent via Sign Up" };
  } catch (err) {
    console.log(`SignUp failed: ${err.name}`);
    if (err.name === "UsernameExistsException") {
      console.log("User exists, attempting ForgotPassword");
      // 2. User exists -> Trigger Forgot Password flow
      try {
        await cognito.send(
          new ForgotPasswordCommand({
            ClientId: process.env.COGNITO_CLIENT_ID,
            SecretHash: generateSecretHash(username),
            Username: username,
          })
        );
        console.log("ForgotPassword successful, OTP sent.");
        // Cognito sends password reset code to email
        return { message: "OTP sent via Forgot Password" };
      } catch (fpErr) {
        console.error("ForgotPassword failed:", fpErr);
        throw fpErr;
      }
    }
    console.error("SignUp error:", err);
    throw err;
  }
};

export const emailOtpVerifyService = async (email, code) => {
  const username = email.toLowerCase();
  const password = tempPasswordStore[username];

  if (!password) {
    throw new Error("Session expired or invalid. Please request OTP again.");
  }

  // 1. Try validating as New User (ConfirmSignUp)
  try {
    await cognito.send(
      new ConfirmSignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        SecretHash: generateSecretHash(username),
        Username: username,
        ConfirmationCode: code,
      })
    );
  } catch (err) {
    // If not authorized (already confirmed) or other error, try Forgot Password confirm
    try {
      await cognito.send(
        new ConfirmForgotPasswordCommand({
          ClientId: process.env.COGNITO_CLIENT_ID,
          SecretHash: generateSecretHash(username),
          Username: username,
          ConfirmationCode: code,
          Password: password, // Reset to the temp password we generated
        })
      );
    } catch (fpErr) {
      if (err.name === "NotAuthorizedException" && fpErr.name !== "CodeMismatchException") {
        // User was already confirmed, and logic fell through to FP but maybe code was for SignUp?
        // This is tricky. Usually if ConfirmSignUp fails due to being confirmed, we MUST use FP.
        // If FP fails, then code is wrong.
      }
      throw new Error("Invalid OTP or Code Mismatch");
    }
  }

  // 2. Login with the known password
  const result = await cognito.send(
    new InitiateAuthCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(username),
      },
    })
  );

  // Clean up
  delete tempPasswordStore[username];

  return {
    accessToken: result.AuthenticationResult.AccessToken,
    refreshToken: result.AuthenticationResult.RefreshToken,
    idToken: result.AuthenticationResult.IdToken,
  };
};

/* ========================================================================
    PHONE OTP LOGIN
======================================================================== */
export const phoneOtpService = async (phone) => {
  const username = phone;
  const tempPassword = generateTempPassword();
  tempPasswordStore[username] = tempPassword;

  try {
    await cognito.send(
      new SignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        SecretHash: generateSecretHash(username),
        Username: username,
        Password: tempPassword,
        UserAttributes: [{ Name: "phone_number", Value: phone }],
      })
    );
    return { message: "OTP sent via Sign Up" };
  } catch (err) {
    if (err.name === "UsernameExistsException") {
      await cognito.send(
        new ForgotPasswordCommand({
          ClientId: process.env.COGNITO_CLIENT_ID,
          SecretHash: generateSecretHash(username),
          Username: username,
        })
      );
      return { message: "OTP sent via Forgot Password" };
    }
    throw err;
  }
};

export const phoneOtpVerifyService = async (phone, code) => {
  const username = phone;
  const password = tempPasswordStore[username];

  if (!password) {
    throw new Error("Session expired or invalid. Please request OTP again.");
  }

  try {
    await cognito.send(
      new ConfirmSignUpCommand({
        ClientId: process.env.COGNITO_CLIENT_ID,
        SecretHash: generateSecretHash(username),
        Username: username,
        ConfirmationCode: code,
      })
    );
  } catch (err) {
    try {
      await cognito.send(
        new ConfirmForgotPasswordCommand({
          ClientId: process.env.COGNITO_CLIENT_ID,
          SecretHash: generateSecretHash(username),
          Username: username,
          ConfirmationCode: code,
          Password: password,
        })
      );
    } catch (fpErr) {
      throw new Error("Invalid OTP or Code Mismatch");
    }
  }

  const result = await cognito.send(
    new InitiateAuthCommand({
      ClientId: process.env.COGNITO_CLIENT_ID,
      AuthFlow: "USER_PASSWORD_AUTH",
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: generateSecretHash(username),
      },
    })
  );

  delete tempPasswordStore[username];

  return {
    accessToken: result.AuthenticationResult.AccessToken,
    refreshToken: result.AuthenticationResult.RefreshToken,
    idToken: result.AuthenticationResult.IdToken,
  };
};

/* ========================================================================
    GET CURRENT USER
======================================================================== */
export const getUserService = async (accessToken) => {
  // Use GetUserCommand with the access token (user context)
  // instead of AdminGetUserCommand which requires AWS credentials
  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  const response = await cognito.send(command);

  return response.UserAttributes.reduce((acc, item) => {
    acc[item.Name] = item.Value;
    return acc;
  }, {});
};

/* ========================================================================
    GOOGLE LOGIN WITH HOSTED UI
======================================================================== */
export const googleAuthRedirect = () => {
  const domain = process.env.COGNITO_DOMAIN;
  const clientId = process.env.COGNITO_CLIENT_ID;
  const redirectUri = process.env.COGNITO_REDIRECT_URI;

  return (
    `https://${domain}/oauth2/authorize?` +
    new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      redirect_uri: redirectUri,
      identity_provider: "Google",
      scope: "openid email profile",
    })
  );
};

export const googleAuthCallback = async (code) => {
  const tokenUrl = `https://${process.env.COGNITO_DOMAIN}/oauth2/token`;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.COGNITO_CLIENT_ID,
    redirect_uri: process.env.COGNITO_REDIRECT_URI,
    code,
  });

  if (process.env.COGNITO_CLIENT_SECRET) {
    params.append("client_secret", process.env.COGNITO_CLIENT_SECRET);
  }

  const res = await axios.post(tokenUrl, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  return {
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
    idToken: res.data.id_token,
  };
};

/* ========================================================================
    PROFILE COMPLETION
======================================================================== */
export const completeProfileService = async ({
  accessToken,
  fullName,
  username,
  phone,
  email,
}) => {
  const updates = [
    { Name: "name", Value: fullName },
    { Name: "preferred_username", Value: username },
  ];

  if (phone) {
    updates.push({ Name: "phone_number", Value: phone });
  }

  if (email) {
    updates.push({ Name: "email", Value: email });
  }

  // Use UpdateUserAttributesCommand with access token (user context)
  // instead of AdminUpdateUserAttributesCommand (requires AWS credentials)
  await cognito.send(
    new UpdateUserAttributesCommand({
      AccessToken: accessToken,
      UserAttributes: updates,
    })
  );

  return { updated: true };
};
