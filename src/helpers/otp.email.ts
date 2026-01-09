import { sendMailMessage } from './email.service';

export const sendOtpEmail = async (otp: string, to: string) => {
  await sendMailMessage({
    to,
    subject: 'your otp code',
    message: `
        <div>
            <p>Hello,</p>
            <p>Your OTP code is: <strong>${otp}</strong>Don't share anyone</p>
            <p>This OTP will expire in 15 minutes.</p>
        </div>
        `,
  });
};
