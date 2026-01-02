import { required } from 'joi';
import { model, Document, Schema, Types, ObjectId } from 'mongoose';

export interface authDocument extends Document {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
  phone?: string;
  role: Types.ObjectId[];
  // permissions: string[];
  isActive: boolean;
  isDeleted: boolean;
  otp?: string;
  otpExpiry?: Date;
   DeletedBy: Schema.Types.ObjectId;
    DeletedAt: Date;
    
  refreshToken?: string;
}

const UserSchema = new Schema<authDocument>(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, sparse: true, unique: true },
    password: { type: String, select: false },
    phone: { type: String, sparse: true },
    role: [{
      type: Schema.Types.ObjectId,
      ref: 'role',
      required: true
    }],
    // permissions:[{type: String}],
  
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    refreshToken: {
      type: String,
    },
      DeletedBy: { type: Schema.Types.ObjectId, ref: 'users' , default: null },
    DeletedAt: { type: Date },
    
    otp: {type:String, select:false},
    otpExpiry: {type:Date},
  },
  { timestamps: true },
);

UserSchema.index({ otpExpiry: 1 }, { expireAfterSeconds: 0 });

export const User = model<authDocument>('users', UserSchema);
