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

export const sendMessageToOCs = async (
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
                    .signature {
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eaeaea;
                    }
                    .signature p {
                        margin: 5px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 1px solid #eaeaea;
                        color: #666;
                        font-size: 0.9em;
                    }
                    .role {
                        color: #4338ca;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <div class="email-container">
                    <div class="header">
                        <h2>Organizing Committee Communication</h2>
                        <p>${hackathonName}</p>
                    </div>
                    <div class="content">
                        <p>Dear Organizing Committee Member,</p>
                        
                        <p>I hope this message finds you well. There's an important update regarding <strong>${hackathonName}</strong>.</p>
                        
                        <div class="message">
                            ${msg}
                        </div>
                        
                        <div class="signature">
                            <p>Best regards,</p>
                            <p><strong>${senderName}</strong></p>
                            <p class="role">Organizing Committee Lead</p>
                            <p>${hackathonName}</p>
                        </div>
                    </div>
                    <div class="footer">
                        <p>This is an official communication from the ${hackathonName} organizing team.</p>
                        <p>Please do not reply to this automated email.</p>
                    </div>
                </div>
            </body>
            </html>
        `;

    const mailOptions = {
      from: process.env.SMTP_USER,
      bcc: to,
      subject: `[${hackathonName}] Important OC Update`,
      html: emailTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log("Message sent successfully")
    return true
  } catch (error) {
    console.error("Error sending email to OC members:", error);
    return false
  }
};
