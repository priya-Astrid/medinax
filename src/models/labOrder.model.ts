import { Document, model, Types, Schema } from 'mongoose';

export interface labOrderDocument extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointmentId: Types.ObjectId;
  tests: [
    {
      testId: Types.ObjectId;
      status: 'pending' | 'processing' | 'completed';
    },
  ];
  totalAmount: number;
  subtotal: Number;
  tax: Number;
  isDeleted: boolean;
  paymentStatus: 'pending' | 'paid';
  orderStatus:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'canceled'
    | 'sample-collected';
  sampleCollection: {
    collected: boolean;
    createdBy: Types.ObjectId;
    createdAt: Date;
    status: 'non-created' | 'created';
  };
  DeletedBy: Types.ObjectId;
  DeletedAt: Date;
}
const labOrderSchema = new Schema<labOrderDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctor', required: true },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: 'appointment',
      required: true,
    },
    tests: [
      {
        testId: { type: Schema.Types.ObjectId, ref: 'labtest', required: true },
        status: {
          type: String,
          enum: ['pending', 'processing', 'completed'],
          default: 'pending',
        },
      },
    ],
    totalAmount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending',
    },
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    orderStatus: {
      type: String,
      enum: [
        'pending',
        'processing',
        'sample-collected',
        'completed',
        'canceled',
      ],
      default: 'pending',
      index: true,
    },
    sampleCollection: {
      collected: { type: Boolean, default: false },
      createdBy: { type: Schema.Types.ObjectId, ref: 'user' },
      createdAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ['non-created', 'created'],
        default: 'non-created',
      },
    },
    DeletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    DeletedAt: { type: Date },
  },
  { timestamps: true },
);

export const labOrder = model<labOrderDocument>('labOrder', labOrderSchema);
