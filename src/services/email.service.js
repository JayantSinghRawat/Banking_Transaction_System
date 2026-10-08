require('dotenv').config();

const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});

const gmail = google.gmail({
    version: "v1",
    auth: oauth2Client
});

function createRawEmail(to, subject, text, html) {
    const email = [
        `From: Banking Ledger <${process.env.EMAIL_USER}>`,
        `To: ${to}`,
        `Subject: ${subject}`,
        "MIME-Version: 1.0",
        'Content-Type: multipart/alternative; boundary="boundary"',
        "",
        "--boundary",
        "Content-Type: text/plain; charset=UTF-8",
        "",
        text,
        "",
        "--boundary",
        "Content-Type: text/html; charset=UTF-8",
        "",
        html,
        "",
        "--boundary--"
    ].join("\r\n");

    return Buffer.from(email)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}

// Function to send email
const sendEmail = async (to, subject, text, html) => {
    try {
        const raw = createRawEmail(
            to,
            subject,
            text,
            html
        );

        const response = await gmail.users.messages.send({
            userId: "me",
            requestBody: {
                raw: raw
            }
        });

        console.log(
            "Message sent:",
            response.data.id
        );

        return response.data;

    } catch (error) {
        console.error(
            "Gmail API error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


async function sendRegistrationEmail(userEmail,name){
    const subject = "Welcome to Banking Ledger";
    const text = `Hello ${name},\n\nThank you for registering at Banking Ledger.
    We're excited to have you on board \n\nBest regards,\n The Banking  Ledger Team`
    const html = `<p>Hello ${name},</p><p>Thank you for registering at Banking Ledger. 
    We're excited to have you on board!</p><p>Best regards, 
    <br>The Banking Ledger Teams</p>`;

    await sendEmail(userEmail,subject,text,html)
    
}

async function sendTransactionEmail(userEmail,name,amount,toAccount){
  const subject = 'Transaction successful!';
  const text = `Hello ${name}, \n\nYour transaction of ₹${amount} to account ${toAccount} was successful. \n\nBest regards,\nThe Banking Ledger Team`;
  const html = `<p>Hello ${name},</p><p>Your transaction of ₹${amount} to account ${toAccount} was sucessful.</p><p>Best regards,<br>The Banking Ledger Team</p>`;

  await sendEmail(userEmail,subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = 'Transaction Failed!';
  const text = `Hello ${name},\n\nWe regret to inform you that your transaction of ₹${amount} to account ${toAccount} has failed.\n\nBest regards,\nThe Banking Ledger Team`;
  const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of ₹${amount} to account ${toAccount} has failed.</p><p>Best regards,<br>The Banking Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}


module.exports = {sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
};