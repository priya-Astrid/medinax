import { Document, model, ObjectId, Schema } from 'mongoose';

export interface LabReportDocument extends Document {
  patientId: Schema.Types.ObjectId;
  testId: Schema.Types.ObjectId;
  orderId: Schema.Types.ObjectId;
  reportUrl: string;
  fileType: string;
  uploadBy: Schema.Types.ObjectId;
  status: 'PENDING' | 'UPLOADED' | 'VERIFIED';
  uploadedAt: Date;
  comment: string;
  reUploadBy: ObjectId;
  reUploadAt: Date;
  verifiedBy: ObjectId;
  verifiedAt: Date;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  DeletedBy: ObjectId;
  DeletedAt: Date;
}
const LabReportSchema = new Schema<LabReportDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'patients', required: true },
    testId: { type: Schema.Types.ObjectId, ref: 'LabTest', required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'LabOrder', required: true },
    reportUrl: { type: String, required: true },
    fileType: { type: String },
    uploadBy: { type: Schema.Types.ObjectId, ref: 'users' },
    status: {
      type: String,
      enum: ['PENDING', 'UPLOADED', 'VERIFIED'],
      default: 'PENDING',
    },
    comment: { type: String },
    uploadedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    reUploadBy: { type: Schema.Types.ObjectId, ref: 'users' },
    reUploadAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'users' },
    verifiedAt: { type: Date },
    DeletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    DeletedAt: { type: Date },
  },
  { timestamps: true },
);

export const LabReport = model<LabReportDocument>('labReport', LabReportSchema);
