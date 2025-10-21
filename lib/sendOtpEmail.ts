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

export const sendOTP = async (
  to: string,
  otp: string,
  mode: string,
  existingUser: IUser | null
) => {
  try {
    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              .email-container {
                  font-family: Arial, sans-serif;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f9f9f9;
              }
              .header {
                  background: linear-gradient(135deg, #4338ca, #312e81);
                  color: white;
                  padding: 25px;
                  text-align: center;
                  border-radius: 8px 8px 0 0;
              }
              .header h2 {
                  margin: 0;
                  font-size: 24px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  gap: 10px;
              }
              .content {
                  background-color: white;
                  padding: 30px;
                  border-radius: 0 0 8px 8px;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .otp-container {
                  background: #f8fafc;
                  border: 2px dashed #4338ca;
                  border-radius: 12px;
                  padding: 20px;
                  margin: 25px 0;
                  text-align: center;
              }
              .otp-code {
                  font-size: 32px;
                  letter-spacing: 8px;
                  color: #4338ca;
                  font-weight: bold;
                  padding: 10px;
                  margin: 10px 0;
                  background: white;
                  border-radius: 8px;
                  display: inline-block;
              }
              .timer {
                  background: #fee2e2;
                  color: #991b1b;
                  padding: 8px 16px;
                  border-radius: 20px;
                  font-size: 14px;
                  font-weight: 600;
                  display: inline-block;
                  margin: 15px 0;
              }
              .security-notice {
                  background: #f3f4f6;
                  border-left: 4px solid #4338ca;
                  padding: 15px;
                  margin: 20px 0;
                  font-size: 0.9em;
                  color: #374151;
              }
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #eaeaea;
                  color: #666;
                  font-size: 0.9em;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h2>🔐 Security Verification</h2>
              </div>
              <div class="content">
                  <p>Hello ${existingUser ? existingUser.name : "User"},</p>
                  
                  <p>You've requested to ${mode} your HackHub account. Use the verification code below to complete the process:</p>
                  
                  <div class="otp-container">
                      <p style="margin: 0; color: #6b7280;">Your verification code is:</p>
                      <div class="otp-code">${otp}</div>
                      <div class="timer">⏰ Expires in 5 minutes</div>
                  </div>
                  
                  <div class="security-notice">
                      <strong>Security Notice:</strong>
                      <ul style="margin: 5px 0; padding-left: 20px;">
                          <li>Never share this code with anyone</li>
                          <li>HackHub will never ask for this code via call or message</li>
                          <li>If you didn't request this code, please ignore this email</li>
                      </ul>
                  </div>
                  
                  <p style="margin-top: 25px;">Need help? Contact our support team.</p>
              </div>
              <div class="footer">
                  <p>Secure verification provided by HackHub</p>
                  <p style="margin-top: 10px; font-size: 0.8em;">
                      This is an automated message, please do not reply
                  </p>
              </div>
          </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"HackHub Security" <${process.env.SMTP_USER}>`,
      to,
      subject: `Your HackHub Verification Code for ${mode}`,
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ OTP email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};
