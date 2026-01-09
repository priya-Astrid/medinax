import { Document, Schema, model, Types } from 'mongoose';

export interface AppointmentDocument extends Document {
  patientId: Types.ObjectId;
  doctorId: Types.ObjectId;
  appointmentDate: Date;
  startTime: string;
  endTime: string;
  reason: string;
  status: 'BOOKED' | 'CANCELLED' | 'COMPLETED' | 'PENDING';
  cancelReason?: string;
  consultationNotes?: string;
  cancelledBy: Types.ObjectId;
  cancelDate: Date;
  createBy: Types.ObjectId;
  previousDate: Date;
  previousStartTime: string;
  previousEndTime: string;
  createdAt: Date;
  updatedAt: Date;
  isReschedule: boolean;
  deletedBy: Schema.Types.ObjectId;
  deletedAt: Date;
}

const appointmentSchema = new Schema<AppointmentDocument>(
  {
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'doctor', required: true },
    appointmentDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    reason: { type: String },
    status: {
      type: String,
      enum: ['BOOKED', 'CANCELLED', 'COMPLETED', 'PENDING'],
      default: 'BOOKED',
    },
    previousDate: { type: Date },
    previousStartTime: { type: String },
    previousEndTime: { type: String },
    cancelReason: { type: String },
    consultationNotes: { type: String },
    createBy: { type: Schema.Types.ObjectId, ref: 'users' },
    cancelledBy: { type: Schema.Types.ObjectId, ref: 'users' },
    cancelDate: { type: Date },
    isReschedule: { type: Boolean, default: false },
    deletedBy: { type: Schema.Types.ObjectId, ref: 'users', default: null },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  },
);
appointmentSchema.index({
  doctorId: 1,
  appointmentDate: 1,
  startTime: 1,
  endTime: 1,
});
export const Appointment = model<AppointmentDocument>(
  'Appointment',
  appointmentSchema,
);

// appointmentType(online/ offline)
// consultaionFess snapShot
// duration
// paymentstatus

//  get /doctor/:id/availability?date=yyyy-mm-dd
// logic -doctor  working hours
// -break time
// already booked slot
// return avaiable slot
