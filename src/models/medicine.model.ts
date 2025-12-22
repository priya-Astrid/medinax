import { Schema, Document, model, Types } from 'mongoose';

export interface medicineDocument extends Document {
  medicineName: string;
  mrp:number;
  purchasPrice: number;
  stock: number;
  category: Types.ObjectId | string;
  salt: string;
  brand: string;
  form?: 'tablet' | 'capsule' | 'syrup' | string;
  images: string[];
  tags: string[];
  description: string;
  prescriptionRequired: boolean;
  manufacturer?: string;
  expiryDate?: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const medicineSchema = new Schema<medicineDocument>(
  {
    medicineName: { type: String, required: true },
    mrp:{type: Number , required: true},
    purchasPrice: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: 'medicineCategory' },
    salt: { type: String },
    brand: { type: String },
    form: { type: String },
    images: [{ type: String }],
    tags: [{type:String}],
    description: { type: String },
    prescriptionRequired: { type: Boolean, default: false },
    manufacturer: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    expiryDate: { type: Date },
  },
  { timestamps: true },
);

export const medicine = model<medicineDocument>('medicine', medicineSchema);
