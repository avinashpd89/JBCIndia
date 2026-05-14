import {
  emailOtpService,
  emailOtpVerifyService,
  phoneOtpService,
  phoneOtpVerifyService,
  googleAuthRedirect,
  googleAuthCallback,
  completeProfileService,
  getUserService,
} from "../services/auth.service.js";

/* ========================= EMAIL OTP ========================= */
export const sendEmailOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const result = await emailOtpService(email);
    res.status(200).json({ message: "OTP sent to email", result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code)
      return res.status(400).json({ message: "Email & code required" });

    const result = await emailOtpVerifyService(email, code);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/* ========================= PHONE OTP ========================= */
export const sendPhoneOtp = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone required" });

    const result = await phoneOtpService(phone);
    res.status(200).json({ message: "OTP sent to phone", result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code)
      return res.status(400).json({ message: "Phone & code required" });

    const result = await phoneOtpVerifyService(phone, code);
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

/* ========================= GOOGLE LOGIN ========================= */
// GET /api/auth/google
export const googleLogin = (req, res) => {
  const url = googleAuthRedirect();
  res.redirect(url);
};


export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const result = await googleAuthCallback(code);

    const redirectUrl = `http://localhost:5173/auth/success?${new URLSearchParams(
      result
    )}`;

    res.redirect(redirectUrl);
  } catch (e) {
    console.error("Google Callback Error:", e.response?.data || e.message);
    const errorMsg =
      e.response?.data?.error_description ||
      e.response?.data?.error ||
      e.message;
    const redirectUrl = `http://localhost:5173/auth/error?error=${encodeURIComponent(
      errorMsg
    )}`;
    res.redirect(redirectUrl);
  }
};


/* ========================= PROFILE COMPLETE ========================= */
export const completeProfile = async (req, res) => {
  try {
    const { accessToken } = req.body;
    const { fullName, username, email, phone } = req.body;

    if (!accessToken)
      return res.status(400).json({ message: "Access token missing" });

    if (!fullName || !username)
      return res.status(400).json({
        message: "Full name and username are required",
      });

    const result = await completeProfileService({
      accessToken,
      fullName,
      username,
      email,
      phone,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ========================= GET CURRENT USER ========================= */
export const getMe = async (req, res) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (!accessToken) return res.status(401).json({ message: "No token provided" });

    const user = await getUserService(accessToken);

    res.status(200).json({ user });
  } catch (e) {
    console.error("GetMe Error:", e);
    res.status(401).json({
      error: "Invalid token",
      message: e.message,
      name: e.name, // e.g. NotAuthorizedException
    });
  }
};