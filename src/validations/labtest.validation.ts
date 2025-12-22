import z from 'zod';
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid Id");
export const labTest = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    category:objectId.optional(),
    simpleType: z.string().optional(),
    price: z.number().min(1),
    processingTime: z.string(),
    preparation: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    status: z.enum(['active', 'inactive']).optional(),
  }),
});
export const updateLabTest = z.object({
  params: z.object({
    id:objectId,
  }),
  body: z
    .object({
      name: z.string().optional(),
      category:objectId.optional(),
      price: z.number().optional(),
      simpleType: z.string().optional(),
      description: z.string().optional(),
      preparation: z.string().optional(),
      tags: z.array(z.string()).optional(),
      status: z.enum(['active', 'inactive']).optional(),
      processingTime: z.string().optional(),
    })
    .partial(),
});

export const idParamValidation = z.object({
  params:z.object({
    id:objectId,
  })
})