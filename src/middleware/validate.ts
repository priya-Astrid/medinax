import { Response, Request, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next()
    } catch (error: any) {
      // Only if ZodError hai tabhi map chale
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'validation error',
          errors: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }
      return next(error);
    }
  };
};
