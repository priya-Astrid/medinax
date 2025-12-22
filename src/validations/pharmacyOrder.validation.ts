import z from 'zod';
export const pharmacyOrderSchema = z.object({
  body: z.object({
    prescriptionId: z.string().optional(),
    patientId: z.string().min(1, "Patient Id is required"),
    items: z.array(
      z.object({
        medicineId: z.string().min(1),
        quantity: z.number().int().min(1),
      })
    ).min(1, "At least one medicine required"),

    address: z.object({
      line1: z.string(),
      city: z.string(),
      state: z.string(),
      pincode: z.string().length(6),
    }),

    paymentMode: z.enum(['cash', 'online']),
  }),
});
