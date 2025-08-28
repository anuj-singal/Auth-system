import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModels.js";
import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
try {
    const reqBody = await request.json()
    const {email} = reqBody;
    console.log(reqBody);

    //check if user exists
    const user = await User.findOne({email}).select("-password");
    if(!user){
        return NextResponse.json({error: "User does not exist"}, {status: 400})
    }
    console.log("user exists");

    await sendEmail({email, emailType: "RESET", userId: user._id})

    return NextResponse.json({success : "User exists!!"}, {status: 200})

} catch (error:any) {
    return NextResponse.json({error: error.message}, {status: 500})
}

}