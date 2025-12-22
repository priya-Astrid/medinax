import { model, Schema, Document } from 'mongoose';

export interface HospitalDocument extends Document {
  hospitalName: string;
  logo?: string;
  registrationNumber?: string;
  telePhone1: string;
  telePhone2: string;
  email: string;
  facilitices: string[];
  departments: string[];
  timing: {
    open: string;
    close: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const hospitalSchema = new Schema<HospitalDocument>(
  {
    hospitalName: { type: String, required: true },
    logo: { type: String },
    registrationNumber: { type: String, unique: true, sparse: true },
    telePhone1: { type: String, required: true },
    telePhone2: { type: String },
    email: { type: String, lowercase: true, trim: true },

    facilitices: [{ type: String, default: [] }],
    departments: [{ type: String, default: [] }],

    timing: { open: { type: String }, close: { type: String } },
    // address: {
    //   street: { type: String },
    //   city: { type: String },
    //   state: { type: String },
    //   pincode: { type: String },
    //   country: { type: String },
    // },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Hospital = model<HospitalDocument>('hospital', hospitalSchema);

//  ├── auth-service/
// │   ├── patient-service/
// │   ├── doctor-service/
// │   ├── appointment-service/
// │   ├── lab-service/
// │   ├── medical-store-service/
// │   ├── billing-service/
// │   ├── notification-service/
// │   ├── admin-service/
// │   ├── hospital-service/
// │   └── analytics-service
