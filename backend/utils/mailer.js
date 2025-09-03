import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use smtp provider config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTP(email, code) {
  const msg = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Note App",
    text: `Your OTP code is ${code}. It expires in 10 minutes.`,
  };
  return transporter.sendMail(msg);
}
