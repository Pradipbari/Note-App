import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: true, unique: true },
    name: String,
    passwordHash: String, // optional (if you want password flow)
    googleId: String,
    otp: {
      code: String,
      expiresAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
