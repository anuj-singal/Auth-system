import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: { token: string; password: string } = await request.json();
    const { token, password } = reqBody;

    console.log(token);

    // Find user with valid token
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    console.log(user);

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Update user
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error: unknown) {
    const e = error as Error;
    console.error("Error in password reset:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
