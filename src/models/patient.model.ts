import mongoose, { Schema, model, Document, Types } from 'mongoose';

export interface PatientDocument extends Document {
  userId: Types.ObjectId;
  image: string;
  age: number;
  gender?: string;
  bloodGroup?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  schedule: [{
    doctorId: Types.ObjectId;
    appointmentId: Types.ObjectId;
    Date: Date;
    startTime: string;
    endTime: string;
    status:string
  }];
  emergencyContact: {
    name?: String;
    phone?: String;
  };
  medicalHistory?: string;
  isActive: boolean;
  DeletedBy: Types.ObjectId;
  DeletedAt: Date;
  isDeleted: boolean;
  dateOfBirth: Date;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
}

const PatientSchema = new Schema<PatientDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      unique: true,
    },
    age: { type: Number },
    image: { type: String },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    medicalHistory: [{ type: String, default: [] }],
    schedule:[{

    }],
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    DeletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    DeletedAt: { type: Date },
    updatedBy: { type: String },
    updatedAt: { type: Date },
    dateOfBirth: { type: Date },
    emergencyContact: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true },
);

export const Patient = model<PatientDocument>('patient', PatientSchema);
