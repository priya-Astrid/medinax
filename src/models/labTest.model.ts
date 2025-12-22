import { Document,Types, model, Schema } from 'mongoose';

export interface LabTestDocument extends Document {
  name: string;
  slug: string;
  patientId: Types.ObjectId;
  category: Types.ObjectId;
  simpleType: string;
  price: number;
  processingTime: string;
  preparation: string;
  tags: string;
  description: string;
  status: 'active' | 'inactive';
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LabTestSchema = new Schema<LabTestDocument>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true },
     patientId:{type: Schema.Types.ObjectId},
    category: {
      type: Schema.Types.ObjectId,
      ref: 'LabCategory',
      required: true,
    },
    price: { type: Number, required: true },
    simpleType: {
      type: String,
      enum: ['blood', 'urine', 'stool', 'imaging', 'other'],
    },
    description: { type: String, required: true },
    processingTime: { type: String, required: true },
    preparation: { type: String },
    tags: [String],
    isDeleted: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },

  { timestamps: true },
);
LabTestSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});
LabTestSchema.pre('findOneAndUpdate', function (next) {
  const update: any = this.getUpdate();
  if (update?.name) {
    update.slug = update.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

export const LabTest = model<LabTestDocument>('labtest', LabTestSchema);
