import { Request, Response, NextFunction } from 'express';
import { MedicalHistoryService } from '../services/medicalHistory.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';

const service = new MedicalHistoryService();

export class MedicalHistoryController {
  // create medicalHistory
  createMedicalHistory = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const medicalHistoryData = await service.createMedicalHistory(data);
    const result: APIResponse<typeof medicalHistoryData> = {
      success: true,
      message: 'medical History create successfully',
      data: medicalHistoryData,
    };
    res.status(200).json(result);
  });
  // getAllRecords api
  getAllRecords = asyncHandler(async (req: Request, res: Response) => {
    const getRecordData = await service.getAllRecords(req.query);
    const result: APIResponse<typeof getRecordData> = {
      success: true,
      message: 'Fetched all Record',
      data: getRecordData,
    };
    res.status(200).json(result);
  });
  //  getSingleRecord
  getSingleRecord = asyncHandler(async (req: Request, res: Response) => {
    const getSingleData = await service.getSingleData(req.params.id);
    const result: APIResponse<typeof getSingleData> = {
      success: true,
      message: 'Fetched Single Records',
      data: getSingleData,
    };
    res.status(200).json(result);
  });
  // update Records
  updateRecords = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await service.updateDataRecord(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'Record update Successfully',
      data: updateData,
    };
    res.status(200).json(result);
  });
  // get searchFilter
  getSearchFilter = asyncHandler(async (req: Request, res: Response) => {
    const searchdata = await service.getSearchData(req.query);
    console.log('this is repos data', searchdata);
    const result: APIResponse<typeof searchdata> = {
      success: true,
      message: 'search filter data',
      data: searchdata,
    };
    res.status(200).json(result);
  });
}
