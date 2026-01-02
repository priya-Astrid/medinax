import { required } from 'joi';
import { model, Document, Schema, ObjectId } from 'mongoose';

export interface prescriptionDocument extends Document {
  appointmentId: Schema.Types.ObjectId;
  patientId: Schema.Types.ObjectId;
  doctorId: Schema.Types.ObjectId;
  medicine: [
    {
      medicineId: ObjectId;
      dosage: string;
      quantity: number;
    },
  ];
  status: string;
  notes: string;
  visitDate: Date;
  isDeleted: boolean;
  DeletedBy: ObjectId;
  DeletedAt: Date;
}
const prescriptionSchema = new Schema<prescriptionDocument>(
  {
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'appointment',
      required: 'true',
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'patient',
      required: 'true',
    },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctor', required: 'true' },
    medicine: [
      {
        medicineId: {
          type: Schema.Types.ObjectId,
          ref: 'medicine',
        },
        dosage: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    status: { type: String, enum: ['draft', 'finalized'], default: 'draft' },
    notes: { type: String },
    visitDate: { type: Date, default: Date.now() },
    isDeleted: { type: Boolean, default: false },
    DeletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    DeletedAt: { type: Date },
  },
  { timestamps: true },
);

export const prescription = model<prescriptionDocument>(
  'prescription',
  prescriptionSchema,
);
