import nodemailer from 'nodemailer';

export const sendOtpEmail = async (otp: string, to: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_pass,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'your otp code',
    html: `
        <div>
            <p>Hello,</p>
            <p>Your OTP code is: <strong>${otp}</strong>Don't share anyone</p>
            <p>This OTP will expire in 15 minutes.</p>
        </div>
        `,
  };
  await transporter.sendMail(mailOptions);
};
