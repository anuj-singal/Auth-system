"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Get token from URL on page load
  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  // Enable/disable button based on password input
  useEffect(() => {
    setButtonDisabled(newPassword.length < 1);
  }, [newPassword]);

  const onResetPassword = async () => {
  try {
    setLoading(true);

    const response = await axios.post("/api/users/resetPassword", {
      token,
      password: newPassword,
    });

    console.log("Reset Password", response.data);
    toast.success("Password reset successfully!");
    router.push("/login");
  } catch (error: unknown) {
    const e = error as { response?: { data?: { error?: string } } };
    console.log("Password reset failed", e.response?.data || (e as Error).message);
    toast.error(e.response?.data?.error || (e as Error).message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#6EB8E1] via-[#D6E6F2] to-[#C8ABE6]">
      {/* Floating orbs for background effect */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-white opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#6EB8E1] opacity-30 blur-3xl animate-ping"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md p-8 bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl"
      >

        <div className="hidden md:block">
          <img
            src="/images/resetpass.svg"
            alt="signup"
            className="h-full w-full object-cover"
          />
        </div>


        <h1 className="text-3xl font-bold text-center text-[#12343b] mb-6">
          {loading ? "Processing..." : "Reset Password"}
        </h1>

        <input
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EB8E1] text-black"
          id="password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />

        <button
          onClick={onResetPassword}
          disabled={buttonDisabled || loading}
          className={`w-full py-3 px-6 rounded-lg transition-colors duration-300 ${
            buttonDisabled || loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#6EB8E1] hover:bg-[#5aa6cc] text-white"
          }`}
        >
          {loading ? "Reseting..." : "Reset Password"}
        </button>

        <p className="mt-4 text-center text-gray-700">
          Remembered your password?{" "}
          <Link href="/login" className="text-[#6EB8E1] hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
