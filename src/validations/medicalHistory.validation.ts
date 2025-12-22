import z from 'zod';

export const medicaHistorySchema = z.object({
  body: z.object({
    doctorId: z.string().min(1, 'doctorId is required'),
    patientId: z.string().min(1, 'patientId is required'),
    appointmentId: z.string().min(1, 'appointmentId is required'),
    medicine: z.array(z.string()).optional(),

    visitDate: z.string().datetime(),
    diagnosis: z.string().optional(),
    allergies: z.array(z.string()).optional(),
    treatments: z.array(z.string()).optional(),
    symptoms: z.array(z.string()).optional(),
    medications: z.array(
      z.object({
        name: z.string(),
        dosage: z.string(),
        duration: z.string(),
      }),
    ),
    attachment: z
      .object({
        fileUrl: z.string().url(),
        fileType: z.string().optional(),
      })
      .optional(),
    notes: z.string().optional(),
    // attachment: string[];
    createdBy: z.string().min(1, 'required id'),
  }),
});
export const updateMedicalHistory = z.object({
  params: z.object({
    id: z.string().min(1, ' medical history id is requied'),
  }),
  body: z
    .object({
      visitDate: z
        .string()
        .datetime({ message: 'Invalid visitDate format' })
        .optional(),

      diagnosis: z.string().trim().min(1).optional(),

      symptoms: z.array(z.string().trim()).optional(),

      allergies: z.array(z.string().trim()).optional(),

      treatments: z.array(z.string().trim()).optional(),
      medications: z
        .array(
          z.object({
            name: z.string().trim().min(1, 'Medicine name is required'),
            dosage: z.string().trim().min(1, 'Dosage is required'),
            frequency: z.string().trim().min(1).optional(),
            durationDays: z.string().trim().min(1).optional(),
          }),
        )
        .optional(),

      attachment: z
        .object({
          fileUrl: z.string().url('Invalid file URL'),
          fileType: z.string().optional(),
        })
        .optional(),

      notes: z.string().trim().optional(),
    })
    .strict(),
});
