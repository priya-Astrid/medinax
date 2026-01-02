import { Schema, Document, Types, model } from 'mongoose';

export interface permissionDocument extends Document {
  _id: Types.ObjectId;
  permissionName: string;
  description: string;
  isDeleted: boolean;
  DeletedBy: Types.ObjectId;
  DeletedAt: Date ;
  // deletedBy: Types.ObjectId;
}

const permissionSchema = new Schema<permissionDocument>(
  {
    permissionName: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
     DeletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
        DeletedAt: { type: Date },
    //    deletedBy:{type: Schema.Types.ObjectId, ref: "users"}
  },
  { timestamps: true },
);

export const permission = model<permissionDocument>(
  'permission',
  permissionSchema,
);
