import { userRepository } from '../repositories/auth.repo';
import bcrypt from 'bcrypt';
import { AppError } from '../utils/AppError';
import jwt from 'jsonwebtoken';
import { sanitizeUser } from '../utils/sanitizeUser';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.utils';
import { sendOtpEmail } from '../utils/mail.utils';
import { Role } from '../models/role.model';
import mongoose from 'mongoose';
import { User } from '../models/auth.model';
import { Doctor } from '../models/doctor.model';
import { Patient } from '../models/patient.model';
import { Types } from 'joi';
export class UserService {
  private repo = new userRepository();

  async createUser(data: any) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const roleDoc = await Role.findOne({ role: data.role });
      if (!roleDoc) throw new AppError(400, `Role ${data.role} not found`);
      // const user = await User.create([data], { session });

      const hashPassword = await bcrypt.hash(data.password, 10);
      // 1️⃣ Create User inside the session
      const [user] = await User.create(
        [
          {
            ...data,
            password: hashPassword,
            role: [roleDoc._id],
          },
        ],
        { session },
      );
      if (roleDoc.role === 'patient') {
        await Patient.create([{ userId: user._id }], { session });
      }
      if (roleDoc.role === 'doctor') {
        await Doctor.create([{ userId: user._id }], { session });
      }
      await session.commitTransaction();
      session.endSession();
      return user;
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
 
  async loginUser(data: any) {
    const user = await this.repo.findByEmail(data.email);
    if (!user) {
      throw new AppError(400, 'user not found');
    }
    if (!user.isActive) {
      throw new AppError(404, 'Account is deactivated please contact admin');
    }
    const isMatch = await bcrypt.compare(data.password, user.password!);
    if (!isMatch) {
      throw new AppError(401, 'Incorrect Password');
    }
    const role = await Role.find({ _id: { $in: user.role } }).populate(
      'permissions',
    );
    if (!role) throw new AppError(400, 'user role not found');
    const permissions = role.flatMap((role: any) =>
      role.permissions.map((role: any) => role.permissionName),
    );
    const sanitized = sanitizeUser(user);
    const payload = {
      id: user._id,
      email: user.email,
      role: role.map(r=>r.role),
      permissions: [...new Set (permissions)],
    };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();
    return { user: sanitized, accessToken, refreshToken };
  }
  // const opt = cropto.randomInt(100000, 999999).toString();
  // const hashedOtp = await bcrypt.hash(otp,10);
  // user.otp = hashedOtp;

  // verify:  const isValid = await bcrypt.compare(data.otp,user.otp);
  async generateOtp(data: { email: string }) {
    const user = await this.repo.findByEmail(data.email);
    if (!user) {
      throw new AppError(404, 'Email not found');
    }
    if (user.isDeleted) {
      throw new AppError(403, 'Account deleted');
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiry = expiry;
    await user.save();
    await sendOtpEmail(otp, user.email!);
    return { message: 'Otp send successfully' };
  }
  async resetUserPassword(data: any) {
    const user = await this.repo.resetpassword(data);
    if (!user) {
      throw new AppError(400, 'Invalid email or otp');
    }
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      throw new AppError(410, 'otp has expired');
    }
    if (!data.newpassword || typeof data.newpassword !== 'string') {
      throw new AppError(400, 'new password is required !');
    }
    const hashPassword = await bcrypt.hash(data.newpassword, 10);
    user.password = hashPassword;
    const sanitized = sanitizeUser(user);

    await user.save();
    return { user: sanitized };
  }
  async getOneUser(id: string) {
    return await this.repo.getByIdUser(id);
  }
  async getAllUser(query: any) {
    return this.repo.findAllUser(query);
  }
  async refreshToken(token: string) {
    try {
      const REFRESH_SECRET = process.env.REFRESH_SECRET!;
      const decoded: any = jwt.verify(token, REFRESH_SECRET);
      const user = await this.repo.getByIdUser(decoded.id);
      if (!user || user.refreshToken !== token) {
        throw new AppError(403, 'invalid refresh token');
      }
      const payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
      const newAccessToken = generateAccessToken(payload);
      const newRefreshToken = generateRefreshToken(payload);

      user.refreshToken = newRefreshToken;
      await user.save();
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: sanitizeUser(user),
      };
    } catch (error: any) {
      throw new AppError(403, 'Invalid or expired refresh Token');
    }
  }
  async logoutsession(refreshToken: string) {
    const user = await this.repo.logoutfind(refreshToken);
    if (!user) return null;
    user.refreshToken = '';
    await user.save();
    return sanitizeUser(user);
  }
  async sendOtp(data: { phone: string }) {
    if (!data.phone) throw new AppError(400, 'phone number is required');
    let user = await this.repo.findByPhone(data.phone);
    if (!user) {
      user = await this.repo.create({ phone: data.phone });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    const hashedOtp= await bcrypt.hash(otp,10);
    user!.otp = hashedOtp;
    user!.otpExpiry = expiry;
    await user!.save();
    return { message: 'otp send Successfully', phone: data.phone };
  }

  async verifyotp(data: { phone: string; otp: string }) {
    const user = await this.repo.findByPhone(data.phone);
    if (!user) throw new AppError(400, 'User not found');
    if (user.otp !== data.otp) throw new AppError(400, 'Invalid otp');
    const isValid = await bcrypt.compare(data.otp, user.otp!);
    if (!isValid) throw new AppError(400, 'invalid otp');

    if (user.otpExpiry && user.otpExpiry < new Date())
      throw new AppError(410, 'otp has expired');

    user.otp = undefined;
    user.otpExpiry = undefined;
    const payload = {
      id: user._id,
      phone: user.phone,
      role: user.role,
    };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user: sanitizeUser(user) };
  }
  async activatedata(id: string, isActive: boolean, userId: any) {
    const admin = await this.repo.activateData(id);
    if (!admin) throw new AppError(404, 'admin not found');
    admin.isActive = isActive;

    admin.save();
    return admin;
  }
  async softDeleteUser(id: string, userId: string) {
    const user = await this.repo.getByIdUser(id);
    if (!user) throw new AppError(400, 'user not found');
    const update = {
      isDeleted: true,
      isActive: false,
      DeleteBy: userId,
      DeleteAt: new Date(),
    };
    const updateData = await this.repo.updateData(id, update);

    return updateData;
  }
}

// async createUser(data: CreateUserDto, requester: AuthUser) {

//   const requesterRole = requester.role;
//   const newUserRole = data.role;

//   // Role creation rules (your rules)
//   const roleCreationRules: Record<string, string[]> = {
//     superadmin: ["admin", "doctor", "recepcinist", "patient"],
//     admin: ["doctor", "recepcinist", "patient"],
//     doctor: ["patient"],
//     recepcinist: ["patient"],
//     patient: [],
//   };

//   // Check rule
//   const allowedRoles = roleCreationRules[requesterRole];

//   if (!allowedRoles.includes(newUserRole)) {
//     throw new AppError(
//       403,
//       `${requesterRole} is not allowed to create a ${newUserRole}`
//     );
//   }

//   // Continue with your existing create logic
//   const existingUser = await this.repo.findByEmail(data.email);
//   if (existingUser) {
//     throw new AppError(400, "User already exists");
//   }

//   // Create user logic...
// }
