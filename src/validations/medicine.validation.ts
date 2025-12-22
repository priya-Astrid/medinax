import z from 'zod';
export const createMedicineSchema = z.object({
  body: z.object({
    medicineName: z.string().min(2),
    mrp: z.number().positive(),
    purchasPrice: z.number().positive(),
    stock: z.number().int().nonnegative().optional(),
    category: z.string(),
    salt: z.string(),
    brand: z.string(),
    form: z.enum(['tablet', 'capsule', 'syrup']).optional(),
    prescriptionRequired: z.boolean().optional(),
    manufacturer: z.string(),
    expiryDate: z.string().optional(),
  }),
});

// expiryDate: z.string().refine(val=> !sNaN(Date.parse(val)),{
//     message: "Invalid date format. use YYYY-MM-DD"
// }).optional();
