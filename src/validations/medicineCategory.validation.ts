import z from 'zod';
export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    categoryIcon: z.string().optional(),
    parentId: z.string().optional(),
    displayOrder: z.number().optional(),
    status: z.boolean().optional(),
  }),
});

export const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    categoryIcon: z.string().optional(),
    parentId: z.string().optional(),
    displayOrder: z.number().optional(),
    status: z.boolean().optional(),
  }),
});
