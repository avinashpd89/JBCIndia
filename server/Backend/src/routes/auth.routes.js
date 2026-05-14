import express from "express";
import {
  sendEmailOtp,
  verifyEmailOtp,
  sendPhoneOtp,
  verifyPhoneOtp,
  googleLogin,
  googleCallback,
  completeProfile,
  getMe,
} from "../controllers/auth.controller.js";

const router = express.Router();

/* ========================= EMAIL OTP ========================= */
router.post("/email/send-otp", sendEmailOtp);
router.post("/email/verify-otp", verifyEmailOtp);

/* ========================= PHONE OTP ========================= */
router.post("/phone/send-otp", sendPhoneOtp);
router.post("/phone/verify-otp", verifyPhoneOtp);

/* ========================= GOOGLE LOGIN ========================= */
router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

/* ========================= COMPLETE PROFILE ========================= */
router.post("/profile/complete", completeProfile);

/* ========================= GET ME ========================= */
router.get("/me", getMe);


export default router;
