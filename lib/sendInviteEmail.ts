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

export const sendInviteEmail = async (to: string, teamName: string, link: string) => {
  try {
    const info = await transporter.sendMail({
      from: `"HackHub" <${process.env.SMTP_USER}>`,
      to,
      subject: `You’re invited to join team ${teamName}!`,
      html: `
        <h2>🎉 HackTracker Pro Invitation</h2>
        <p>You’ve been invited to join the team <strong>${teamName}</strong>.</p>
        <p>Click below to accept:</p>
        <a href="${link}" style="padding:10px 15px;background:#0070f3;color:white;text-decoration:none;border-radius:8px;">Accept Invitation</a>
        <br/><br/>
        <small>If you didn’t expect this invite, you can ignore this email.</small>
      `,
    });

    console.log("✅ Invitation email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending invite email:", error);
  }
};
