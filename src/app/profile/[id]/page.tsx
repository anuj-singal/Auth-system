"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function UserProfilePage() {
  const params = useParams(); // get dynamic route param
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        // Fetch user details from your API
        const res = await axios.get(`/api/users/${params.id}`);
        setUser(res.data);
      } catch (error: unknown) {
        const e = error as Error;
        console.log("Failed to fetch user:", e.message);
        toast.error("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.name ? user.name.charAt(0).toUpperCase() : user.id.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-3">{user.name || "User Profile"}</h1>
          <p className="text-gray-600 text-sm">{user.email || "Detailed information about this user"}</p>
        </div>

        {/* User Info */}
        <div className="bg-gray-100 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-600 mb-1">User ID</p>
          <p className="text-lg font-mono font-medium text-gray-800 break-words">{user.id}</p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition">
            Message User
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="w-full py-3 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
          >
            Back to Profiles
          </button>
        </div>
      </div>
    </div>
  );
}
