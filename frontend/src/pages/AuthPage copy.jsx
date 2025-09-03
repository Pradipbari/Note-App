import React, { useState } from "react";
import { sendOtp, verifyOtp } from "../api";

export default function AuthPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState("enter-email"); // enter-email / enter-otp
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async () => {
    if (!email) {
      setMessage("Enter a valid email");
      return;
    }
    try {
      await sendOtp(email);
      setPhase("enter-otp");
      setMessage("OTP sent to your email (check spam).");
    } catch (err) {
      setMessage(err?.response?.data?.msg || "Failed to send OTP");
    }
  };

  const handleVerify = async () => {
    try {
      const res = await verifyOtp(email, otp);
      const { token } = res.data;
      onLogin(token);
    } catch (err) {
      setMessage(err?.response?.data?.msg || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">
        {/* Left: Login Form */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Notes</h2>

          {phase === "enter-email" && (
            <>
              <input
                className="w-full border p-2 rounded mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="w-full bg-indigo-600 text-white p-2 rounded"
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
              <div className="text-center mt-3">or</div>
              <a
                href={`${
                  process.env.REACT_APP_API_URL || "http://localhost:5000/api"
                }/auth/google`}
                className="w-full inline-block text-center mt-3 bg-white border p-2 rounded hover:bg-gray-50"
              >
                Continue with Google
              </a>
            </>
          )}

          {phase === "enter-otp" && (
            <>
              <div className="mb-2 text-sm">OTP sent to {email}</div>
              <input
                className="w-full border p-2 rounded mb-2"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="w-full bg-green-600 text-white p-2 rounded"
                onClick={handleVerify}
              >
                Verify & Login
              </button>
              <button
                className="w-full mt-2 bg-gray-200 p-2 rounded"
                onClick={() => setPhase("enter-email")}
              >
                Back
              </button>
            </>
          )}

          {message && <div className="mt-3 text-red-600">{message}</div>}
        </div>
        {/* Right: Image */}
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
          <img
            src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
            alt="Notes Illustration"
            className="object-cover h-80 w-80 rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
