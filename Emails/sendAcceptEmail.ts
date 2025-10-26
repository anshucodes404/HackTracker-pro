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

interface AcceptEmailProps {
  teamLeaderEmail: string;
  teamLeaderName: string;
  accepterName: string;
  accepterEmail: string;
  hackathonName: string;
  teamName: string;

 
}

function generateAcceptEmailHTML({
  teamLeaderName,
  accepterName,
  teamName,
  hackathonName,


}: AcceptEmailProps) {
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
            border-bottom: 2px solid #22c55e;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .content {
            background: #f0fdf4;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
          }
          .next-steps {
            background: #ffffff;
            border: 1px solid #dcfce7;
            border-radius: 6px;
            padding: 15px;
            margin: 15px 0;
          }
          .button {
            display: inline-block;
            background-color: #22c55e;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
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
          <h2>Welcome to the Team! 🎉</h2>
        </div>
        <div class="content">
          <p>Hi ${teamLeaderName},</p>
          <p>Great news! <strong>${accepterName}</strong> has accepted your invitation to join team <strong>${teamName}</strong> for the ${hackathonName}.</p>
          
          <div class="next-steps">
            <h3>Next Steps:</h3>
            <ul>
              <li>Start brainstorming project ideas with your team</li>
              <li>Review the hackathon rules and guidelines</li>
              <li>Check your development environment is ready</li>
            </ul>
          </div>

          <p>We're excited to see what your team will create!</p>
        </div>
        <div class="footer">
          <p>This is an automated message from HackHub. Please do not reply to this email.</p>
        </div>
      </body>
    </html>
  `;
}

export async function sendAcceptEmail(props: AcceptEmailProps) {
  try {
    await transporter.sendMail({
      from: `"HackHub" <${process.env.SMTP_USER}>`,
      to: props.teamLeaderEmail,
      subject: `${props.accepterName} joined your team - ${props.hackathonName}`,
      html: generateAcceptEmailHTML(props),
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending accept email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to send email'
    };
  }
}

