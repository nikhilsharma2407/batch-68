import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  connectionTimeout: 10000, // 10 seconds
  socketTimeout: 10000, // 10 seconds
  pool: {
    maxConnections: 1,
    maxMessages: 5,
    rateDelta: 1000,
    rateLimit: 5,
  },
});

// Handle transporter errors
transporter.on('error', (error) => {
  console.error('Transporter error:', error);
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Mail transporter verification failed:', error);
  } else {
    console.log('Mail transporter is ready');
  }
});

export default transporter;