import { Request, Response, NextFunction } from 'express';
import { prescriptionService } from '../services/prescription.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { AppError } from '../utils/AppError';

const service = new prescriptionService();
export class prescriptionController {
  prescriptionAdd = asyncHandler(async (req: Request, res: Response) => {
    const AddData = await service.pricriptionAdd(req.body);
    const result: APIResponse<typeof AddData> = {
      success: true,
      message: 'prescription add successfully',
      data: AddData,
    };
    res.status(200).json(result);
  });
  getPrescription = asyncHandler(async (req: Request, res: Response) => {
    const getDataList = await service.getDataList(req.query);
    const result: APIResponse<typeof getDataList> = {
      success: true,
      message: 'prescription data fetched successfully',
      data: getDataList,
    };
    res.status(200).json(result);
  });
  updatePrescription = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await service.updatePrescription(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'update Prescription successfuly',
      data: updateData,
    };
    res.status(200).json(result);
  });
  deletePrescription = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if(!req.user?.id) throw new AppError(404, "unauthorized access")
    const deleteData = await service.softdeleteData(req.params.id, req.user.id);
    const result: APIResponse<typeof deleteData> = {
      success: true,
      message: 'soft deleted Successfully ',
    };
    res.status(204).json(result);
  });
}
