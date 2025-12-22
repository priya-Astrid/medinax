import { Document, model, Schema } from 'mongoose';

export interface labCategoryDocument extends Document {
  name: string;
  slug: string;
  description: string;
  icon: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
const labCategorySchema = new Schema<labCategoryDocument>({
  name: { type: String, required: true, trim: true },
  slug:{type:String, unique: true},
  description: { type: String, },
  icon: { type: String,  },
  isDeleted:{type: Boolean, default: false},
  isActive: { type: Boolean, default: true },
},{timestamps: true});

labCategorySchema.pre("save", function(next){
  this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  next();
})
labCategorySchema.pre("findOneAndUpdate", function(next){
  const update: any = this.getUpdate();
  if(update?.name){
    update.slug =update.name.toLowerCase().replace(/\s+/g,"-")
  }
  next();
})
export const LabCategory = model<labCategoryDocument>(
  'LabCategory',
  labCategorySchema,
);
