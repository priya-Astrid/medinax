import { Document, model, Schema, Types } from 'mongoose';

export interface categoryDocument extends Document {
  name: string;
  slug: string;
  categoryIcon: string;
  parentId: Types.ObjectId | null;
  displayOrder: number;
  status: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<categoryDocument>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    slug: { type: String, lowercase: true, unique: true },
    categoryIcon: { type: String },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'medicineCategory',
      default: null,
    },
    displayOrder: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  }
  next();
});

categorySchema.pre("findOneAndUpdate", function(next){
  const update: any = this.getUpdate();
  if(update?.name){
    update.slug =update.name.toLowerCase().replace(/\s+/g,"-")
  }
  next();
})
export const Category = model<categoryDocument>(
  'medicineCategory',
  categorySchema,
);
