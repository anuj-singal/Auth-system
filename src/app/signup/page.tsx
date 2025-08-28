"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    }catch (error: unknown) {
      const e = error as Error; // type assertion
      console.log("Signup failed", e.message);
      toast.error(e.message);
    }finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#6EB8E1] via-[#D6E6F2] to-[#C8ABE6]">
      {/* Floating orbs */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-white opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#6EB8E1] opacity-30 blur-3xl animate-ping"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 grid max-w-5xl grid-cols-1 md:grid-cols-2 items-center bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Left side: Illustration */}
        <div className="hidden md:block">
          <img
            src="/images/signup.svg"
            alt="signup"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right side: Form */}
        <div className="p-10 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-[#12343b] mb-6">
            {loading ? "Processing..." : "Create Account ✨"}
          </h1>

          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EB8E1] text-black"
          />

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EB8E1] text-black"
          />

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6EB8E1] text-black"
          />

          <button
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className={`w-full py-3 px-6 rounded-lg text-white transition-colors duration-300 ${
              buttonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6EB8E1] hover:bg-[#5aa6cc]"
            }`}
          >
            {buttonDisabled
              ? "Fill all fields"
              : loading
              ? "Signing up..."
              : "Signup"}
          </button>

          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <Link href="/login" className="text-[#6EB8E1] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
