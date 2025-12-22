import z from 'zod';

export const prescriptionValidation = z.object({
  patientId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/),
  appointmentId: z.string().regex(/^[0-9a-fA-F]{24}$/),

  medicine: z
    .array(
      z.object({
        medicineId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        dosage: z.string().min(1),
        quantity: z.number().positive(),
      }),
    )
    .min(1),

  notes: z.string().optional(),
});
