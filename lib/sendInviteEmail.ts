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

// hackathonName, teamName, leader, memberEmail, inviteLink
export const sendInviteEmail = async (
  to: string,
  teamName: string,
  link: string,
  hackathonName: string,
  leaderName: string
) => {
  try {
    const info = await transporter.sendMail({
      from: `"HackHub" <${process.env.SMTP_USER}>`,
      to,
      subject: `You’re invited to join team ${teamName}!`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f6f8fa; padding: 32px;">
          <div style="max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); padding: 32px 28px;">
            <div style="text-align:center; margin-bottom: 24px;">
              <img src="https://raw.githubusercontent.com/feathericons/feather/master/icons/users.svg" alt="HackHub" width="48" style="margin-bottom: 8px;"/>
              <h2 style="margin:0; color:#222; font-size: 1.6rem;">🎉 HackHub Team Invitation</h2>
            </div>
            <p style="font-size:1.1rem; color:#333;">Hello,</p>
            <p style="font-size:1.1rem; color:#333;">
              <strong>${leaderName}</strong> has invited you to join the team <strong>${teamName}</strong> for the hackathon <strong>${hackathonName}</strong> on <span style="color:#0070f3; font-weight:500;">HackHub</span>!
            </p>
            <div style="text-align:center; margin: 32px 0;">
              <a href="${link}" style="display:inline-block; padding:12px 28px; background:#0070f3; color:#fff; border-radius:6px; font-size:1.1rem; text-decoration:none; font-weight:600; letter-spacing:0.5px; box-shadow:0 2px 6px rgba(0,112,243,0.08);">Accept Invitation</a>
            </div>
            <p style="font-size:1rem; color:#555;">If you didn’t expect this invite, you can safely ignore this email.</p>
            <hr style="border:none; border-top:1px solid #eee; margin:32px 0 16px 0;"/>
            <div style="text-align:center; color:#aaa; font-size:0.95rem;">Made with ❤️ by HackHub</div>
          </div>
        </div>
      `,
    });

    console.log("✅ Invitation email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Error sending invite email:", error);
  }
};
