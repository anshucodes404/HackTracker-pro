import { IUser } from "@/models/user.model";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOTP = async (to: string, otp: string, mode: string, existingUser: IUser | null) => {
  try {
    const info = await transporter.sendMail({
      from: `"HackHub" <${process.env.SMTP_USER}>`,
      to,
      subject: `Your OTP to ${mode} for HackHub`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>🔐 Your OTP Code</h2>
          <p>Hello ${existingUser ? existingUser.name : "User"},</p>
          <p>Your one-time password (OTP) is:</p>
          <h1 style="letter-spacing: 5px; color: #0070f3;">${otp}</h1>
          <p>This code will expire in <b>5 minutes</b>.</p>
          <br />
          <p>If you didn’t request this, please ignore this email.</p>
          <p>— HackHub Team</p>
        </div>
      `,
    });

    console.log("✅ Invitation email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending invite email:", error);
  }
};
