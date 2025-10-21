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

export const sendMessageToTeamLeads = async (
  to: string[],
  msg: string,
  hackathonName: string,
  senderName: string
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
                        background-color: #4338ca;
                        color: white;
                        padding: 20px;
                        text-align: center;
                        border-radius: 8px 8px 0 0;
                    }
                    .content {
                        background-color: white;
                        padding: 20px;
                        border-radius: 0 0 8px 8px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    .message {
                        line-height: 1.6;
                        color: #333;
                        margin: 20px 0;
                        padding: 15px;
                        background-color: #f5f5f5;
                        border-left: 4px solid #4338ca;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #666;
                        font-size: 0.9em;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h2>Message from Hackathon Organizer</h2>
                    </div>
                    <div class="content">
                        <p>Dear Team Lead,</p>
                        
                        <p>You have received a message regarding the hackathon <strong>${hackathonName}</strong>.</p>
                        
                        <div class="message">
                            ${msg}
                        </div>
                        
                        <p>Best regards,<br>${senderName}<br>Hackathon Organizer</p>
                    </div>
                    <div class="footer">
                        <p>This is an automated message from HackHub. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      bcc: to,
      subject: `Message from ${hackathonName} Organizer`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("Message sent successfully")
  } catch (error) {
    console.error("Error sending email to team leads:", error);
  }
};
