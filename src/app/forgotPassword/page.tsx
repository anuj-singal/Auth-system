"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function ForgotPassword() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onForgetPassword = async () => {
    try {
      setLoading(true);
      await axios.post("/api/users/forgotPassword", user);
      toast.success("Password reset link sent to your email!");
      router.push("/login");
    } catch (error: unknown) {
      const e = error as { response?: { data?: { error?: string } }; message?: string };
      toast.error(e.response?.data?.error || e.message || "Failed to send reset link");
      console.log("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(user.email.length < 1);
  }, [user]);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FCECDD] via-[#A8DADC] to-[#457B9D] animate-gradient" />

      {/* Floating Orbs */}
      <div className="absolute inset-0">
        <div className="orb top-10 left-20 bg-[#F4A261]/40" />
        <div className="orb bottom-20 right-32 bg-[#2A9D8F]/40" />
        <div className="orb top-1/2 left-1/3 bg-[#E9C46A]/30" />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-4xl flex rounded-2xl shadow-2xl bg-white/95 backdrop-blur overflow-hidden"
      >
        {/* Left Side – Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-[#E9C46A]/20 p-6">
          <Image
            src="/images/forgotpass.svg"
            alt="Forgot password illustration"
            width={400}
            height={400}
            className="w-3/4 h-auto drop-shadow-lg"
          />
        </div>

        {/* Right Side – Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-[#2A9D8F] mb-2">
            {loading ? "Processing..." : "Forgot Password"}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Don’t worry! Enter your registered email and we’ll send you a reset link.
          </p>

          <label htmlFor="email" className="block text-sm font-medium text-[#457B9D] mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#2A9D8F] text-black"
          />

          <button
            onClick={onForgetPassword}
            disabled={buttonDisabled || loading}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
              buttonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#2A9D8F] text-white hover:bg-[#F4A261]"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </div>
      </motion.div>

      {/* Extra CSS Animations */}
      <style jsx>{`
        .animate-gradient {
          background-size: 400% 400%;
          animation: gradientMove 15s ease infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .orb {
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          filter: blur(100px);
          animation: float 12s ease-in-out infinite alternate;
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to { transform: translateY(-60px); }
        }
      `}</style>
    </div>
  );
}
