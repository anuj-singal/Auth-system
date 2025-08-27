import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
        console.log(token);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        user.password = hashedPassword;
        user.forgotPasswordToken= undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();
        
        return NextResponse.json({
            message: "Password Reset successfully",
            success: true
        })

    } catch (error:any) {
            console.log("error in password reset");
            return NextResponse.json({error: error.message}, {status: 500})
    }
}