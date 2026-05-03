import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  port:465,
  secure: true, // TLS
  auth: {
    user: process.env.EMAIL_USERNAME, // google username | email test@gmail.com username = test 
    pass: process.env.EMAIL_PASSWORD, // The 16-character App Password
  },
});

export default transporter;