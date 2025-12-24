
export const sendOtpSms = async(otp: string, phone: string)=>{
    // integrate sms provide twilio
    console.log(`sending Otp ${otp} to phone number ${phone}`)
    return true;
}