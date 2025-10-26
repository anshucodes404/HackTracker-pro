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

export const sendInviteEmail = async (
  to: string[],
  teamName: string,
  link: string,
  hackathonName: string,
  leaderName: string
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
              }
              .header p {
                  margin: 5px 0 0;
                  opacity: 0.9;
                  font-size: 16px;
              }
              .content {
                  background-color: white;
                  padding: 30px;
                  border-radius: 0 0 8px 8px;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
              }
              .message {
                  line-height: 1.8;
                  color: #1a1a1a;
                  margin: 25px 0;
                  padding: 20px;
                  background-color: #f5f5f5;
                  border-left: 4px solid #4338ca;
                  border-radius: 0 4px 4px 0;
              }
              .cta-button {
                  display: inline-block;
                  padding: 14px 32px;
                  background: #4338ca;
                  color: white;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: 600;
                  font-size: 16px;
                  margin: 20px 0;
                  text-align: center;
                  transition: background-color 0.3s ease;
              }
              .cta-button:hover {
                  background: #312e81;
              }
              .team-info {
                  background: #f8fafc;
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  padding: 15px;
                  margin: 20px 0;
              }
              .team-info p {
                  margin: 5px 0;
                  color: #334155;
              }
              .footer {
                  text-align: center;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #eaeaea;
                  color: #666;
                  font-size: 0.9em;
              }
              .highlight {
                  color: #4338ca;
                  font-weight: 600;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <h2>🎉 Team Invitation</h2>
                  <p>${hackathonName}</p>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  
                  <div class="message">
                      You've been invited to join an exciting team for an upcoming hackathon!
                  </div>

                  <div class="team-info">
                      <p><strong>Team Name:</strong> <span class="highlight">${teamName}</span></p>
                      <p><strong>Team Leader:</strong> ${leaderName}</p>
                      <p><strong>Hackathon:</strong> ${hackathonName}</p>
                  </div>
                  
                  <div style="text-align: center;">
                      <a href="${link}" class="cta-button">
                          Accept Team Invitation
                      </a>
                  </div>
                  
                  <p style="color: #64748b; font-size: 0.9em; margin-top: 25px;">
                      This invitation will expire soon. If you didn't expect this invitation, you can safely ignore this email.
                  </p>
              </div>
              <div class="footer">
                  <p>This is an official invitation from HackHub</p>
                  <p style="margin-top: 10px;">Made with ❤️ by HackHub Team</p>
              </div>
          </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"HackHub" <${process.env.SMTP_USER}>`,
      to,
      subject: `Join ${teamName} for ${hackathonName} on HackHub! 🚀`,
      html: emailTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Invitation email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error sending invite email:", error);
    throw error;
  }
};
