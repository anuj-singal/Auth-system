"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
  try {
    await axios.post("/api/users/verifyemail", { token });
    setVerified(true);
  } catch (error: unknown) {
    setError(true);
    const e = error as { response?: { data?: unknown } };
    console.log(e.response?.data);
  }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#6EB8E1] via-[#D6E6F2] to-[#C8ABE6]">
      {/* background glow effects */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-white opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#6EB8E1] opacity-30 blur-3xl animate-ping"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl text-center"
      >
        <div className="hidden md:block">
          <img
            src="/images/verify.svg"
            alt="signup"
            className="h-full w-full object-cover"
          />
        </div>

        
        <h1 className="text-3xl font-bold text-[#12343b] mb-6">
          Verify Your Email 📧
        </h1>

        {/* Show token just for debugging (optional) */}
        {token && (
          <p className="text-xs text-gray-600 mb-4 break-all">
            Token: {token}
          </p>
        )}

        {verified && (
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              ✅ Email Verified Successfully!
            </h2>
            <Link
              href="/login"
              className="inline-block bg-[#6EB8E1] hover:bg-[#5aa6cc] text-white py-2 px-6 rounded-lg transition-colors"
            >
              Go to Login
            </Link>
          </div>
        )}

        {error && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-red-600 mb-4">
              ❌ Invalid or Expired Token
            </h2>
            <Link
              href="/signup"
              className="inline-block bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition-colors"
            >
              Sign Up Again
            </Link>
          </div>
        )}

        {!verified && !error && (
          <p className="text-gray-700">Verifying your email...</p>
        )}
      </motion.div>
    </div>
  );
}
