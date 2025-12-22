import z from 'zod';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/);
export const labReport = z.object({
  body: z.object({
    patientId: objectId,
    testId: objectId,
    orderId: objectId,
    reportUrl: z.string().optional(),
    fileType: z.string().optional(),
    status: z.enum(['PENDING', 'UPLOADED', 'VERIFIED']).optional(),
    comment: z.string().optional(),
    uploadBy: z.string().optional(),
    reUploadBy: z.string().optional(),
    verifiedBy: z.string().optional(),
    isDeleted: z.string().optional(),
  }),
});
