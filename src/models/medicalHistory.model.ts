import { string } from 'joi';
import { model, Document, Schema, Types, ObjectId } from 'mongoose';

export interface medicalDocument extends Document {
  doctorId: Types.ObjectId;
  patientId: Types.ObjectId;
  medicine: string[];
  visitDate: Date;
  diagnosis: string;
  appointmentId: Types.ObjectId;
  allergies?:string[];
  treatments?: string[];
  symptoms: string[];
  medications: [{
    name: string;
    dosage: string;
    frequency: string;
    durationDays: string;
  }];
   attachment?: {
    fileUrl: string;
  };
  notes: string;
  // attachment: string[];
  createdBy : ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const medicalSchema = new Schema<medicalDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctor', required: true },
    visitDate: { type: Date, default: Date.now },
    diagnosis: { type: String, trim :true },
    symptoms: { type: [String], default:[] },
    notes: { type: String },
    attachment: {fileUrl: {type: String},  fileType: {type:String} },
     allergies:[String],
      treatments:[String],
      appointmentId:{
        type: Schema.Types.ObjectId,
        ref:"appointment",
        required: true,
        unique: true
      },
    medications: [{
      name: String,
      dosage: String,
      frequency: String,
      durationDays: String,
    }],
    createdAt: { type: Date },
    updatedAt: { type: Date },
    createdBy: {type: Schema.Types.ObjectId, ref:"user"},
  },
  { timestamps: true },
);

export const medicalHistory = model<medicalDocument>('medicalHistory', medicalSchema);