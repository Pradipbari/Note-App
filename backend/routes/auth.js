import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js";
import { sendOTP } from "../utils/mailer.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// 1) Send OTP for signup/login
router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email required" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email });
  }
  user.otp = { code, expiresAt };
  await user.save();

  try {
    await sendOTP(email, code);
    return res.json({ msg: "OTP sent" });
  } catch (err) {
    console.error("mailer error:", err);
    return res.status(500).json({ msg: "Failed to send OTP" });
  }
});

// 2) Verify OTP and issue JWT
router.post("/verify-otp", async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code)
    return res.status(400).json({ msg: "Email and OTP required" });

  const user = await User.findOne({ email });
  if (!user || !user.otp || user.otp.code !== code) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }
  if (new Date() > user.otp.expiresAt) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  // clear otp
  user.otp = undefined;
  await user.save();

  const token = signToken(user);
  return res.json({
    token,
    user: { email: user.email, id: user._id, name: user.name },
  });
});

// 3) Google OAuth endpoints
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: true,
    failureRedirect: "/api/auth/google/failure",
  }),
  (req, res) => {
    // Successful auth, create JWT and redirect to frontend with token
    const token = signToken(req.user);
    const redirectUrl = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/?token=${token}`;
    return res.redirect(redirectUrl);
  }
);

router.get("/google/failure", (req, res) => {
  res.status(400).json({ msg: "Google auth failed" });
});

export default router;
