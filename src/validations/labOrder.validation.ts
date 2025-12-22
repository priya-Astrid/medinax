import z from 'zod';
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);
export const createLabOrder = z.object({
  patientId: objectId,
  doctorId: objectId,
  appointmentId: objectId,
  tests: z
    .array(
      z.object({
        testId: objectId,
        name: z.string().min(1),
        price: z.number().min(0),
      }),
    )
    .min(1),
  totalAmount: z.number(),
});
