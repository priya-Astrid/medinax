import { APIResponse } from '../dtos/common/response.dto';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { CategoryService } from '../services/category.service';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';
import { Response, Request } from 'express';
const service = new CategoryService();
export class CategoryController {
  categoryCreate = asyncHandler(async (req: Request, res: Response) => {
    const createData = await service.createCategory(req.body);
    const result: APIResponse<typeof createData> = {
      success: true,
      message: 'Created Data Successfully',
      data: createData,
    };
    res.status(201).json(result);
  });
  getAllCategory = asyncHandler(async (req: Request, res: Response) => {
    const fetchData = await service.getAll(req.query);
    const result: APIResponse<typeof fetchData> = {
      success: true,
      message: 'Category fetched successfully',
      data: fetchData,
    };
    res.status(200).json(result);
  });
  updateData = asyncHandler(async (req: Request, res: Response) => {
    const updatedData = await service.updateData(req.params.id, req.body);
    const result: APIResponse<typeof updatedData> = {
      success: true,
      message: 'updated data successfully',
      data: updatedData,
    };
    res.status(200).json(result);
  });
  softDelete = asyncHandler(
    async (req: AuthenticatedRequest, res: Response) => {
      if (!req.user?.id) {
        throw new AppError(401, 'unsuthorized access');
      }
      const userId = req.user.id;
      const id = req.params.id;
      const data = await service.softDelete(id, userId);
      const result: APIResponse<typeof data> = {
        success: true,
        message: 'Soft Deleted Data',
        data: data,
      };
      res.status(200).json(result);
    },
  );
}
