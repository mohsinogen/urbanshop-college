import nodemailer from 'nodemailer';

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // You can use other services like SendGrid or AWS SES
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER, // Your email address (e.g., Gmail address)
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
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
