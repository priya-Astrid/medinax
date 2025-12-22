import { Request, Response } from 'express';
import { consultationService } from '../services/consultation.service';
import { APIResponse } from '../dtos/common/response.dto';
import { create } from 'domain';
import { asyncHandler } from '../utils/asyncHandler';

const services = new consultationService();
export class consultationController {
  createConsultation = asyncHandler(async (req: Request, res: Response) => {
    const createData = await services.createConsultation(req.body);
    const result: APIResponse<typeof createData> = {
      success: true,
      message: 'created data successfully',
      data: createData,
    };
    res.status(200).json(result);
  });
  getAllConsultation = asyncHandler(async (req: Request, res: Response) => {
    const getAllData = await services.getAllConsultation(req.query);
    const result: APIResponse<typeof getAllData> = {
      success: true,
      message: 'Consultation fetched successfully',
      data: getAllData,
    };
    res.status(200).json(result);
  });
  getSingleConsultation = asyncHandler(async (req: Request, res: Response) => {
    const getSingleData = await services.singleconsultation(req.params.id);
    const result: APIResponse<typeof getSingleData> = {
      success: true,
      message: 'SingleConsultation featched successfully',
      data: getSingleData,
    };
    res.status(200).json(result);
  });
  updateConsultation = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const updateData = await services.updateData(id, data);
    const result: APIResponse<typeof updateData> = {
      success: true,
      message: 'consultation updated successfully',
      data: updateData,
    };
    res.status(200).json(result);
  });
  cancelConsultation = asyncHandler(async (req: Request, res: Response) => {
    const cancelData = await services.cancelData(req.params.id);
    const result: APIResponse<typeof cancelData> = {
      success: true,
      message: 'consultation cancelled successfully',
      data: null,
    };
    res.status(203).json(result);
  });
  MarkCompleted = asyncHandler(async (req: Request, res: Response) => {
    const markComplete = await services.markCompleteData(req.params.id);
    const result: APIResponse<typeof markComplete> = {
      success: true,
      message: 'Mark completed Successfully',
      data: markComplete,
    };
    res.status(200).json(result);
  });
  notes = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    const notesData = await services.notesUpdate(id, data);
    const result: APIResponse<typeof notesData> = {
      success: true,
      message: 'notes updated successfully',
      data: notesData,
    };
    res.status(200).json(result);
  });
}
