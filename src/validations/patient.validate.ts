import z from 'zod';

export const updatePatientSchema = z.object({
  body: z.object({
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'invalid  date format',
    }),
    gender: z.enum(['male', 'female', 'other']).optional(),

    phone: z
      .string()
      .regex(/^[0-9]{10}$/, { message: 'phone must be 10 digit' })
      .optional(),
    age: z.preprocess(
      (val) => Number(val),
      z.number().min(0).max(120).optional(),
    ),
    address: z
      .object({
        street: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pincode: z.string().optional(),
      })
      .optional(),
    emergencyContact: z.object({
      name: z.string().optional(),
      phone: z.string().optional(),
    }).optional(),
  }),
});
export const imageUploadSchema = z.object({
  body: z.object({
    image: z.string().optional(),
  }),
});

export const adminUpdateProfileSchema = z.object({
  body: z.object({
    bloodGroup: z
      .enum(['AB+', 'A+', 'AB-', 'B-', 'O+', 'O-', 'B+', 'A-'])
      .optional(),
    medicalHistory: z.array(z.string()).optional(),
  }),
});
