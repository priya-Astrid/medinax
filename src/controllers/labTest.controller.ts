import { NextFunction, Request, Response } from 'express';
import { LabTestService } from '../services/labTest.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';

const service = new LabTestService();
export class LabTestController  {
  createLabTest = asyncHandler(
    async (req: Request, res: Response) => {
      const createData = await service.labTestCreate(req.body);
      const result: APIResponse<typeof createData> = {
        success: true,
        message: 'LabTest created successfully',
        data: createData,
      };
      res.status(201).json(result);
    },
  );

  getAllLabTest = asyncHandler(
    async (req: Request, res: Response) => {
      const getAllData = await service.getAllData(req.query);
      const result: APIResponse<typeof getAllData> = {
        success: true,
        message: 'Labtest Fetched  Successfully',
        data: getAllData,
      };
      res.status(200).json(result);
    },
  );
  singleLabTestData = asyncHandler(
    async (req: Request, res: Response) => {
      const SingleData = await service.singleData(req.params.id);
      const result: APIResponse<typeof SingleData> = {
        success: true,
        message: 'Lab Test Fetched successfully',
        data: SingleData,
      };
      res.status(200).json(result);
    },
  
  );
  updateData = asyncHandler(
    async (req: Request, res: Response) => {
     const updateData = await service.updateData(req.params.id, req.body);
      const result: APIResponse<typeof updateData> = {
        success: true,
        message: 'Data updated Successfully',
        data: updateData,
      };
      res.status(200).json(result);
    },
  );
  
  softDelete = asyncHandler(
    async (req: Request, res: Response) => {
      const deleteData = await service.isSoftDelete(req.params.id);
      const result: APIResponse<typeof deleteData> = {
        success: true,
        message: 'deleted data successfully',
        data: null,
      };
      res.status(200).json(result);
    },
  );
}
