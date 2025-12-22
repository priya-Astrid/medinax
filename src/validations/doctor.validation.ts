import z from 'zod';

export const DoctorValidationSchema = z.object({
  body: z
    .object({
      specialization: z.string().min(2).optional(),
      department: z.string().min(2).optional(),
      fees: z.number().positive(),
      qualifications: z.array(z.string().min(2)).optional(),
      experience: z.number().min(0).optional(),
      availableDays: z.array(z.string()).optional(),
      availableTime: z
        .object({
          start: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
          end: z.string().regex(/^([0-1]\d|2[0-3]):([0-5]\d)$/),
        })
        .optional(),
    })
    .strict(),
});
