import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another email service, like 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER, // your email address
    pass: process.env.EMAIL_PASSWORD,  // your email password or App password (for Gmail)
  },
});

export const sendEmail = (to, subject, html) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // HTML body content
  };

  // Send mail
  return transporter.sendMail(mailOptions);
};
