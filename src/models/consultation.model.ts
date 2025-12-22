import { Document, model, ObjectId, Schema } from 'mongoose';

export interface consultationDocument extends Document {
  patientId: ObjectId;
  doctorId: ObjectId;
  appointmentId: ObjectId;
  reason: string;
  vital: {
    height: number;
    weight: number;
    bp: string;
    temperature: number;
    pulse: number;
    respiratoryRate: number;
    spo2: string;
  };
  diagnosis: string;
  notes: string;
  prescriptionId: ObjectId;
  followUpDate: Date;
  status: 'OPEN' | 'COMPLETED';
  attachment?: {
    fileName: string;
    fileUrl: string;
  }[];
  createdAt: Date;
}
const vitalSchema = new Schema({
  height: Number,
  weight: Number,
  bp: String,
  temperature: Number,
  pulse: String,
  respiratoryRate: Number,
  spo2: String,
});

const attachmentSchema = new Schema({
  fileName: String,
  fileUrl: String,
});
const consultationSchema = new Schema<consultationDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctor', required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'appointment' },
    reason: { type: String, required: true },
    vital: vitalSchema,
    diagnosis: { type: String, required: true },
    notes: { type: String, required: true },
    prescriptionId: { type: Schema.Types.ObjectId },
    status: { type: String, enum: ['OPEN', 'COMPLETED'], default: 'OPEN' },
    followUpDate: { type: Date },
    attachment: [attachmentSchema],
  },
  { timestamps: true },
);

export const consultation = model<consultationDocument>(
  'consultation',
  consultationSchema,
);
