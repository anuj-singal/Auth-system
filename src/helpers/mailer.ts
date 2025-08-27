import nodemailer from 'nodemailer';
import User from "@/models/userModels.js";
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    const mailOptions = {
      from: '"My App" <no-reply@myapp.com>',
      to: email,
      subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: emailType === "VERIFY" 
      ? 
        `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`  
      : 
        `<p>Click <a href="${process.env.DOMAIN}/resetPassword?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/resetPassword?token=${hashedToken}
        </p>` 
    };

    const mailresponse = await transport.sendMail(mailOptions);

    console.log("Mail sent successfully:", mailresponse.messageId);

    return mailresponse;
    
  } catch (error: any) {
    console.error("Error inside sendEmail:", error.message); // <== ADD THIS
    throw new Error(error.message);
  }
};
