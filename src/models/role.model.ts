import { model, Document, Schema, Types } from 'mongoose';
// import { permissionDocument } from './permissions';
export interface RoleDocument extends Document {
  role: string;
  description: string;
  permissions : Types.ObjectId[] ;
  isDeleted?:boolean;
  isDefault?:boolean;
} 
const RoleSchema = new Schema<RoleDocument>({
  role: {
    type: String,
    required: true,
    unique: true,
  },
  description:{
    type: String,
    trim: true,
  },
   permissions :[{type: Schema.Types.ObjectId, ref:'permission'}],
   isDefault:{type: Boolean, default: false},
   isDeleted:{type: Boolean, default: false},
  },
{timestamps: true}
);

export const Role = model<RoleDocument>('role', RoleSchema);