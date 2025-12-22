import z, { email } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, 'Must contain UperCase')
      .regex(/[0-9]/, 'Must contain Number'),
    role: z.enum(['admin', 'doctor', 'recepcinist', 'patient']),
  }),
});

export const LoginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, 'Must contain UperCase')
      .regex(/[0-9]/, 'Must contain Number'),
  }),
});
export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email(),
    otp: z.string().min(6),
    newpassword: z
      .string()
      .min(8)
      .regex(/[A-Z]/, 'Must contain UperCase')
      .regex(/[0-9]/, 'Must contain Number'),
  }),
});
