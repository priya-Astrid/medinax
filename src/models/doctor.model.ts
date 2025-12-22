import { model, Schema, Document } from 'mongoose';

export interface DoctorDocument extends Document {
  userId: string;
  specialization?: string;
  department?: string;
  qualifications?: string[];
  consultationFees: string;
  experience?: number;
  fees: string;
  availableDays?: string[];
  availableTime?: {
    start?: string;
    end?: string;
  };
  isActive: boolean;
  updateBy:Schema.Types.ObjectId;
  updateAt: Date;
  DeleteBy: Schema.Types.ObjectId;
  DeleteAt: Date;
  isDeleted: boolean;
  schedule: [
    {
      day?: string;
      startTime?: string;
      endTime?: string;
    },
  ];
}
const DoctorSchema = new Schema<DoctorDocument>(
  {
    userId: { type: String, ref: 'users', unique: true, required: true },
    specialization: { type: String, index: true },
    fees: { type: String },
    consultationFees:{type: String},
    department: { type: String },
    qualifications: [String],
    experience: { type: Number },
    availableDays: [String],
    availableTime: {
      start: String,
      end: String,
    },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    DeleteBy: { type: Schema.Types.ObjectId, ref: 'users' , default: null },
    DeleteAt: { type: Date },
    updateBy: { type: Schema.Types.ObjectId, ref: 'users' , default: null },
    updateAt: { type: Date },

    schedule: [
      {
        day: { type: String },
        startTime: { type: String },
        endTime: { type: String },
      },
    ],
  },
  { timestamps: true },
);
export const Doctor = model<DoctorDocument>('doctor', DoctorSchema);
