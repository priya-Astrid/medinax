import { Document, model, Schema, Types } from 'mongoose';

export interface NotificationDocument extends Document {
  userId: Types.ObjectId;
  title: 'APPOINTMENT' | 'LAB' | 'INVOICE' | 'PRESCRIPTION';
  type: string;
  message: string;
  channel: 'EMAIL' | 'SMS' | 'SYSTEM';
  status: 'PENDING' | 'SENT' | 'FAILED';
  isRead: boolean;
  metadata: string;
  createAt: Date;
}
const notificationSchema = new Schema<NotificationDocument>(
  {
    userId: { type: Schema.Types.ObjectId },
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true },
    message: { type: String, required: true },
    channel: { type: String, default: 'SYSTEM' },
    status: { type: String, default: 'PENDING' },
    isRead: { type: Boolean, default: false },
    metadata: { type: String },
  },
  { timestamps: true },
);

export const notificaion = model<NotificationDocument>(
  'notifications',
  notificationSchema,
);
