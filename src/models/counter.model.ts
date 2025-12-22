import { string } from "joi";
import { Document, model, Schema } from "mongoose";
export interface counterDocument extends Document{
  key: string;
  seq: number;   
}

const counterSchema = new Schema<counterDocument>({
    key:{type: String, required: true, unique: true},
    seq:{type: Number, default: 0}
})
export const counter = model<counterDocument>('counter', counterSchema)