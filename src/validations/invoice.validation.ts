import z from 'zod';
export const createInvoiceSchema = z.object({
  body: z.object({
    patientId: z.string().optional(),
    doctorId: z.string().optional(),
    appointment: z.string().optional(),
    items: z
      .array(
        z.object({
          type: z.enum(['medicine', 'labtest', 'consultation']),
          refId: z.string(),
          quantity: z.number().min(1).optional(),
        }),
      )
      .min(1, 'At least one item is required'),
  }),
});

export const updateInvoiceStatusSchema =z.object({
    body: z.object({
            status: z.enum(['pending', 'paid', 'cancelled', 'partial']),
    })
})