import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { labOrderServices } from '../services/labOrder.service';
import { read } from 'fs';
import { APIResponse } from '../dtos/common/response.dto';

const services = new labOrderServices();
export class labOrderController {
  createLabOrder = asyncHandler(async (req: Request, res: Response) => {
    const createData = await services.createLabOrder(req.body);
    const result: APIResponse<typeof createData> = {
      success: true,
      message: 'LabOrder created Successfully',
      data: createData,
    };
    res.status(201).json(result);
  });
  getAllLabOrder = asyncHandler(async (req: Request, res: Response) => {
    const getData = await services.getAllData(req.query);
    const result: APIResponse<typeof getData> = {
      success: true,
      message: 'Fetched data successfully',
      data: getData,
    };
    res.status(200).json(result);
  });
  getSingleData = asyncHandler(async (req: Request, res: Response) => {
    const getsingleData = await services.singleData(req.params.id);
    const result: APIResponse<typeof getsingleData> = {
      success: true,
      message: 'Single Data successfully',
      data: getsingleData,
    };
    res.status(200).json(result);
  });
  updateLabOrder = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await services.updateData(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'updated data successfully',
      data: updateData,
    };
    res.status(200).json(result);
  });
  cancelLabOrder = asyncHandler(async (req: Request, res: Response) => {
    const cancelData = await services.cancelData(req.params.id);
    const result: APIResponse<typeof cancelData> = {
      success: true,
      message: 'cancel Data successfully',
      data: cancelData,
    };
    res.status(200).json(result);
  });
  statusUpdate = asyncHandler(async (req: Request, res: Response) => {
    const {status} = req.body;
      const role = (req as any).user.role;

    const statusData = await services.statusUpdate(req.params.id,status, role);
    const result: APIResponse<typeof statusData> = {
      success: true,
      message: 'Status Updated successfully',
      data: statusData,
    };
    res.status(200).json(result);
  });
  collectSample = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const collectData = await services.collectSimpleData(id, data);
    const result: APIResponse<typeof collectData> = {
      success: true,
      message: 'sample collected successfully',
      data: collectData,
    };
    res.status(200).json(result);
  });
  startProcessing = asyncHandler(async (req: Request, res: Response) => {
    const startProcessingData = await services.startaprocessing(req.params.id);
    const result: APIResponse<typeof startProcessingData> = {
      success: true,
      message: 'start processing successfully',
      data: startProcessingData,
    };
    res.status(200).json(result);
  });
 
}
