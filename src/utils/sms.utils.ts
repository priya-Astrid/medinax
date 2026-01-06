// import twilio from 'twilio'; 
// const client = twilio(
//     process.env.TWILIO_SID!,
//     process.env.TWILIO_AUTH_
// )

export const sendOtpSms = async(otp: string, phone: string)=>{
    // integrate sms provide twilio
    console.log(`sending Otp ${otp} to phone number ${phone}`)
    return true;
}