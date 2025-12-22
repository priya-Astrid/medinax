import { authDocument } from "../models/auth.model";

export const sanitizeUser = (user: authDocument) =>{
    const obj = user.toObject();
    delete obj.password;
    delete obj.refreshToken;
    delete obj.otpExpiry;
    delete obj.otp;

    return obj;
}
