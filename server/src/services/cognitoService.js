import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || "ap-south-1",
});

const CLIENT_ID = process.env.AWS_COGNITO_CLIENT_ID;
const CLIENT_SECRET = process.env.AWS_COGNITO_CLIENT_SECRET;

const calculateSecretHash = (username) => {
  if (!CLIENT_SECRET) return undefined;
  return crypto
    .createHmac("SHA256", CLIENT_SECRET)
    .update(username + CLIENT_ID)
    .digest("base64");
};

const cognitoService = {
  // ================= LOGIN =================
  login: async (email, password) => {
    const secretHash = calculateSecretHash(email);

    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        ...(secretHash && { SECRET_HASH: secretHash }),
      },
    });

    const response = await client.send(command);
    const result = response.AuthenticationResult;

    return {
      accessToken: result.AccessToken,
      idToken: result.IdToken,
      refreshToken: result.RefreshToken,
    };
  },

  // ================= SIGNUP =================
  signUp: async (email, password) => {
    const secretHash = calculateSecretHash(email);

    const command = new SignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      Password: password,
      ...(secretHash && { SecretHash: secretHash }),
      UserAttributes: [
        {
          Name: "email",
          Value: email,
        },
      ],
    });

    const response = await client.send(command);
    return response;
  },

  // ================= VERIFY OTP =================
  verifyOTP: async (email, code) => {
    const secretHash = calculateSecretHash(email);

    const command = new ConfirmSignUpCommand({
      ClientId: CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      ...(secretHash && { SecretHash: secretHash }),
    });

    return await client.send(command);
  },
};

export default cognitoService;