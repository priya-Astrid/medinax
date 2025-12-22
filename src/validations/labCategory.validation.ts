import z from 'zod';

export const createLabCategory = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});
export const updateLabCategory = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().length(24),
  }),
});
