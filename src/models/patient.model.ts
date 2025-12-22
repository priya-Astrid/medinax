import mongoose, { Schema, model, Document } from 'mongoose';

export interface PatientDocument extends Document {
  userId: mongoose.Types.ObjectId;
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
  emergencyContact: {
    name?: String;
    phone?: String;
  };
  medicalHistory?: string[];
  isActive: boolean;
  DeleteBy: string;
  DeleteAt: Date;
  isDeleted: boolean;
  dateOfBirth: Date;
  createdAt: Date;
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
    image: {type: String},
    gender: { type: String, enum:["male", "female", "other"] },
    medicalHistory: { type: [String], default: [] },

    bloodGroup: { type: String, enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"] },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    DeleteBy: { type: String },
    DeleteAt: { type: Date },
    dateOfBirth: { type: Date },
    emergencyContact: {
      name: String,
      phone: String,
    },
  },
  { timestamps: true },
);

export const Patient = model<PatientDocument>('patient', PatientSchema);
