import { Response, Request } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { LabCategoryService } from '../services/labCategory.service';
import { APIResponse } from '../dtos/common/response.dto';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AppError } from '../utils/AppError';

const service = new LabCategoryService();
export class LabCategoryController {
  createData = asyncHandler(async (req: Request, res: Response) => {
    const data = await service.createData(req.body);
    const result: APIResponse<typeof data> = {
      success: true,
      message: 'created data successfully',
      data: data,
    };
    res.status(201).json(result);
  });
  getAllData = asyncHandler(async (req: Request, res: Response) => {
    const fetchData = await service.getAllData(req.query);
    const result: APIResponse<typeof fetchData> = {
      success: true,
      message: 'fetched data successfully',
      data: fetchData,
    };
    res.status(200).json(result);
  });
  UpdateLabTest = asyncHandler(async (req: Request, res: Response) => {
    const UpdateLabData = await service.updateData(req.params.id, req.body);
    const result: APIResponse<typeof UpdateLabData> = {
      success: true,
      message: 'updated Data successfully',
      data: UpdateLabData,
    };
    res.status(200).json(result);
  });
  getSingleLab = asyncHandler(async (req: Request, res: Response) => {
    const singleData = await service.singleData(req.params.id);
    const result: APIResponse<typeof singleData> = {
      success: true,
      message: 'Single fetched successfuly',
      data: singleData,
    };
    res.status(200).json(result);
  });
  getDropdown = asyncHandler(async(req: Request, res: Response)=>{
    const dropdownData = await service.dropdownData();
    const result : APIResponse<typeof dropdownData>={
      success: true,
      message:"dropdown fetched successfully",
      data : dropdownData
    }
    res.status(200).json(result);
  })
  softDeleteLab = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if(!req.user?.id) throw new AppError(401, "unauthorized access")
    const data = await service.softDelete(req.params.id, req.user.id);
    const result: APIResponse<typeof data> = {
      success: true,
      message: 'Deleted data successfully',
      data: data,
    };
    res.status(200).json(result);
  });
}
