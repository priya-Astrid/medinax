import { transporter } from "../config/email.config";

export const sendMailMessage = async({
    to, 
    subject,
    message,
}:{
    to:string;
    subject: string;
    message: string;
})=>{
try{
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html:`<p>${message}</p>`
    })
}
catch(error){
    console.error('Email send failed', error);
    throw error;
}
}