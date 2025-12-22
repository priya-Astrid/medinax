import z from 'zod';

export const updatePatientSchema = z.object({
  body: z.object({
    dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'invalid  date format',
    }),
    gender: z.enum(['male', 'female', 'other']).optional(),
    bloodGroup: z
      .enum(['AB+', 'A+', 'AB-', 'B-', 'O+', 'O-', 'B+', 'A-'])
      .optional(),
    phone: z
      .string()
      .regex(/^[0-9]{10}$/, { message: 'phone must be 10 digit' })
      .optional(),
    address: z
      .object({
        street: z
          .string()
          .min(1, { message: ' street is requied' })
          .trim()
          .optional(),
        city: z
          .string()
          .min(1, { message: 'city is required' })
          .trim()
          .optional(),
        state: z
          .string()
          .min(1, { message: 'state is required' })
          .trim()
          .optional(),
        pincode: z
          .string()
          .regex(/^\d{6}$/, { message: ' pincode must be 6 digit' })
          .optional(),
      })
      .optional(),
    image: z.string().optional(),
    age: z.number().min(0).max(120).optional(),
    medicalHistory: z
      .array(z.string().min(1, { message: 'can not be empty' }))
      .optional(),
  }),
});
