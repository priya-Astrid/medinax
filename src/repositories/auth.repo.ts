
import { User, authDocument } from '../models/auth.model';
import { ClientSession } from 'mongoose';
import { buildQuery } from '../utils/buildQuery';
export class userRepository {
  async create(data: any, option: { session?: ClientSession } = {}) {
    // return await User.create(data);
    const [user] = await User.create([data], option);
    return user;
  }
  findByEmail(email: string){
    return User.findOne({ email }).select("+password");
  }
  async forgetpassword(id: string, data: string): Promise<authDocument | null> {
    return await User.findById(id, data);
  }
  async resetpassword(
    data: Partial<authDocument>,
  ): Promise<authDocument | null> {
    return await User.findOne({ email: data.email, otp: data.otp }).select("+password");
  }
  async getByIdUser(id: string): Promise<authDocument | null> {
    return await User.findById(id).select("-password -otp -otpExpiry");
  }

  async updateData(id: string, data: Partial<authDocument>){
      return await User.findByIdAndUpdate(id, data, {new : true}).select("-password -otp -otpExpiry")
  }
  async findAllUser(query: any){
    const {filter, options} = buildQuery(query);
    const data = await User.find(filter, null, options);
    const total = await User.countDocuments(filter);
    return {
      data, 
      total,
      page: Math.ceil(options.skip/ options.limit)+1,
      limit: options.limit
    }
    // return await User.find();
  }
  async logoutfind(refreshToken: string): Promise<authDocument | null> {
    return await User.findOne({ refreshToken });
  }
  async findByPhone(phone: string): Promise<authDocument | null> {
    return await User.findOne({ phone });
  }
  async findotp(otp: string): Promise<authDocument | null> {
    return await User.findOne({ otp });
  }
  async activateData(id: string) {
    return await User.findById(id);
  }
}
