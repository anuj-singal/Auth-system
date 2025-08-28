import nodemailer from "nodemailer";
import User from "@/models/userModels.js";
import bcryptjs from "bcryptjs";

interface SendEmailProps {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailProps) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user with token and expiry
    const updateData =
      emailType === "VERIFY"
        ? { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000 }
        : { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 };

    await User.findByIdAndUpdate(userId, updateData);

    // Create transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    // Common link for email
    const link =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetPassword?token=${hashedToken}`;

    const mailOptions = {
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width:600px; margin:auto; padding:20px; background:#f9f9f9; border-radius:12px; border:1px solid #e0e0e0;">
          <div style="text-align:center; margin-bottom:20px;">
            <img src="https://repository-images.githubusercontent.com/262579731/325861c3-21b2-46e5-90d8-97d0ff23d789" alt="Mailguard" width="120"/>
          </div>
          <h2 style="color:#2A9D8F; text-align:center;">Hello!</h2>
          <p style="color:#333; line-height:1.6; text-align:center;">
            ${
              emailType === "VERIFY"
                ? "Thank you for joining MailGuard! Please verify your email address to get started."
                : "We received a request to reset your password. Click the button below to reset it."
            }
          </p>
          <div style="text-align:center; margin:30px 0;">
            <a href="${link}" style="
              display:inline-block;
              padding:12px 28px;
              background:${emailType === "VERIFY" ? "#2A9D8F" : "#F4A261"};
              color:white;
              font-weight:bold;
              border-radius:8px;
              text-decoration:none;
              font-size:16px;
              box-shadow:0 4px 6px rgba(0,0,0,0.1);
            ">${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}</a>
          </div>
          <p style="text-align:center; font-size:12px; color:#666;">
            If the button above does not work, copy and paste the following link into your browser:<br/>
            <a href="${link}" style="color:#2A9D8F; word-break:break-all;">${link}</a>
          </p>
          <p style="text-align:center; color:#999; font-size:12px; margin-top:30px;">
            If you did not request this, you can safely ignore this email.<br/>Cheers,<br/><strong>The MailGuard Team</strong>
          </p>
        </div>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    console.log("Mail sent successfully:", mailResponse.messageId);
    return mailResponse;
  } catch (error: unknown) {
    const e = error as Error;
    console.error("Error inside sendEmail:", e.message);
    throw new Error(e.message);
  }
};
