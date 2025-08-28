import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Send verification email
    try {
      await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    } catch (emailError) {
      console.error("Email send failed:", emailError);
    }

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });

  } catch (error: unknown) {
    const e = error as Error; // type assertion
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
