import z from 'zod';

export const createConsultationSchema = z.object({
  patientId: z.string().min(1),
  doctorId: z.string().min(1),
  appointmentId: z.string().optional(),
  reason: z.string().optional(),
   vital: z.object({
      height: z.number().optional(),
      weight: z.number().optional(),
      bp: z.string().optional(),
      temperature: z.number().optional(),
      pulse: z.number().optional(),
      respiratoryRate: z.number().optional(),
      spo2: z.string().optional(),
    }),
  diagnosis: z.string().min(1),
  notes: z.string().min(1).optional(),
  prescriptionId: z.string().optional(),
  status: z.enum(['OPEN', 'COMPLETED']).optional(),
  followUpDate: z.string().datetime().optional(),
  attachment: z
    .object({
      fileUrl: z.string().url(),
      fileType: z.string().optional(),
    })
    .optional(),
});
