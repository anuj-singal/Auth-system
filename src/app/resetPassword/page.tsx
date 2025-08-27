"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

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
      router.push("/");
    } catch (error: any) {
      console.log("Password reset failed", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">{loading ? "Processing..." : "Reset Password"}</h1>

      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />

      <button
        onClick={onResetPassword}
        disabled={buttonDisabled || loading}
        className={`p-2 border rounded-lg ${buttonDisabled ? "bg-gray-300" : "bg-blue-500 text-white"} focus:outline-none`}
      >
        {loading ? "Reseting..." : "Reset Password"}
      </button>
    </div>
  );
}
