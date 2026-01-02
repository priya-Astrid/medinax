import { Document, ObjectId, Schema, model, Types } from 'mongoose';
export interface OrderItem {
  medicineId: Types.ObjectId;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
export interface pharmacyDocument extends Document {
  prescriptionId: ObjectId;
  patientId: ObjectId;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryCharges?: number;
  totalAmount: number;
  // medicines: [medicineId: ObjectId, quantity: number, price: number];
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  paymentMode: 'cash' | 'online';
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  orderStatus: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  isDelete: boolean;
  DeletedBy: Types.ObjectId;
  DeletedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
const orderItemSchema = new Schema({
  medicineId: {
    type: Schema.Types.ObjectId,
    ref: 'medicine',
    required: true,
  },
  name: { type: String },
  quantity: { type: Number, required: true },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});
const PharmacySchema = new Schema<pharmacyDocument>(
  {
    prescriptionId: { type: Schema.Types.ObjectId },
    patientId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    items: [orderItemSchema],
    subtotal: { type: Number },
    tax: { type: Number },
    deliveryCharges: { type: Number },
    totalAmount: { type: Number },
    paymentMode: { type: String, enum: ['cash', 'online'], required: true },
    paymentStatus: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },
    orderStatus: {
      type: String,
      enum: ['PENDING', 'COMPLETED', 'CANCELLED'],
      default: 'PENDING',
    },
    isDelete: { type: Boolean },
    DeletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    DeletedAt: { type: Date },
    address: {
      line1: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
  },
  { timestamps: true },
);

export const pharmacy = model<pharmacyDocument>('phamacyOrder', PharmacySchema);
