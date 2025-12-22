import { Request, Response } from 'express';
import { pharmacyService } from '../services/pharmacyOrder.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';

const service = new pharmacyService();
export class pharmacyController {
  createPharmacy = asyncHandler(async (req: Request, res: Response) => {
    const createData = await service.pharmacyData(req.body);
    const result: APIResponse<typeof createData> = {
      success: true,
      message: 'pharmacy data successfully',
      data: createData,
    };
    res.status(201).json(result);
  });
  getAllData = asyncHandler(async (req: Request, res: Response) => {
    const getData = await service.getPharmacyData(req.query);
    const result: APIResponse<typeof getData> = {
      success: true,
      message: 'data fetched successfully',
      data: getData,
    };
    res.status(200).json(result);
  });
  updatePharmacyData = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await service.updatePharmacyData(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'update data successfully',
      data: updateData,
    };
    res.status(200).json(result);
  });
  softDeleted = asyncHandler(async (req: Request, res: Response) => {
    const deletedData = await service.isDeletedData(req.params.id);
    const result: APIResponse<typeof deletedData> = {
      success: true,
      message: 'data deleted succfully',
      data: deletedData,
    };
    res.status(203).json(result);
  });
}
