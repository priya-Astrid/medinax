import { Document, model, Schema, Types } from 'mongoose';

export interface invoiceDocument extends Document {
  invoiceNo: string;
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointment: Types.ObjectId;
  items: {
     type: 'consultation' | 'medicine' | 'labtest' | 'service';
    refId: Types.ObjectId;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  status: string;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
}
const invoiceSchema = new Schema<invoiceDocument>(
  {
    invoiceNo: { type: String },
    patientId: { type: Schema.Types.ObjectId, ref: 'patient', default: null },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctor', default: null },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'appointment',
      default: null,
    },
    items: [{
      type: {
        type: String,
        enum: ['consultation', 'medicine', 'labtest', 'service'],
        required: true,
      },
      refId: { type: Schema.Types.ObjectId, required: true },
      description: { type: String, required: true },
      quantity: { type: Number },
      unitPrice: { type: Number },
      total: { type: Number },
    }],

    subtotal: { type: Number },
    discount: { type: Number },
    tax: { type: Number },
    grandTotal: { type: Number },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled', 'partial'],
      default: 'pending',
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Invoice = model<invoiceDocument>('invoice', invoiceSchema);
