import z from 'zod';
export const createNotifySchema = z.object({
  body: z.object({
    userId: z.string(),
    type: z.enum(['APPOINTMENT', 'LAB', 'INVOICE', 'PRESCRIPTION']),
    title: z.string().min(3),
    message: z.string().min(5),
    channel: z.enum(['SMS', 'EMAIL', 'SYSTEM']).optional(),
    metadata: z.string().optional(),
  }),
});
