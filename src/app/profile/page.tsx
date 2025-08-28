"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");

  const logout = async () => {
  try {
    await axios.get("/api/users/logout");
    toast.success("Logout successful");
    router.push("/login");
  } catch (error: unknown) {
    const e = error as Error;
    console.log(e.message);
    toast.error(e.message);
  }
};

const getUserDetails = async () => {
  try {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  } catch (error: unknown) {
    const e = error as Error;
    console.log(e.message);
    toast.error("Failed to fetch user details");
  }
};


  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#6EB8E1] via-[#D6E6F2] to-[#C8ABE6]">
      {/* background effects */}
      <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-white opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#6EB8E1] opacity-30 blur-3xl animate-ping"></div>

      <div className="relative z-10 flex w-full max-w-5xl bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-[#C8ABE6] to-[#6EB8E1] p-8">
          <img
            src="/images/profile.svg"
            alt="Profile illustration"
            className="w-3/4"
          />
        </div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center"
        >
          <h1 className="text-3xl font-bold text-[#12343b] mb-4">
            Profile Page 👤
          </h1>
          <p className="text-gray-700 mb-6">
            Welcome to your profile. Manage your account below.
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {data === "nothing" ? (
                <span className="px-3 py-1 bg-gray-300 rounded-lg text-gray-700">
                  Nothing
                </span>
              ) : (
                <Link
                  href={`/profile/${data}`}
                  className="px-3 py-1 bg-green-400 rounded-lg text-white hover:bg-green-600"
                >
                  ID: {data}
                </Link>
              )}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={logout}
              className="bg-[#6EB8E1] hover:bg-[#5aa6cc] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
            >
              Logout
            </button>
            <button
              onClick={getUserDetails}
              className="bg-[#C8ABE6] hover:bg-[#b497d1] text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors"
            >
              Get User Details
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
