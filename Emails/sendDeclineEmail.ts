import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface DeclineEmailProps {
  teamLeaderName: string,
  teamLeaderEmail: string;
  declinerName: string;
  declinerEmail: string;
  hackathonName: string;
  teamName: string;
}

function generateDeclineEmailHTML({
  teamLeaderName,
  declinerName,
  declinerEmail,
  hackathonName,
  teamName,
}: DeclineEmailProps) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .content {
            background: #f9fafb;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .footer {
            font-size: 0.875rem;
            color: #6b7280;
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Invitation Declined</h2>
        </div>
        <div class="content">
          <p>Hi ${teamLeaderName},</p>
          <p>We wanted to let you know that <strong>${declinerName}</strong> (${declinerEmail}) has declined your invitation to join team <strong>${teamName}</strong> for the ${hackathonName}.</p>
          <p>You may want to:</p>
          <ul>
            <li>Reach out to them directly to understand their decision</li>
            <li>Invite another participant to join your team</li>
            <li>Review your team composition if needed</li>
          </ul>
          <p>Good luck with your hackathon preparations!</p>
        </div>
        <div class="footer">
          <p>This is an automated message from HackHub. Please do not reply to this email.</p>
        </div>
      </body>
    </html>
  `;
}

export async function sendDeclineEmail(props: DeclineEmailProps) {
  try {
    await transporter.sendMail({
      from: `"HackHub" <${process.env.SMTP_USER}>`,
      to: props.teamLeaderEmail,
      subject: `${props.declinerName} declined team invitation - ${props.hackathonName}`,
      html: generateDeclineEmailHTML(props),
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending decline email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

