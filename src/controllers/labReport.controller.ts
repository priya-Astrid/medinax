import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { LabReportService } from '../services/labReport.service';
import { APIResponse } from '../dtos/common/response.dto';
import { AppError } from '../utils/AppError';

const service = new LabReportService();
export class LabReportController {
  uploadReport = asyncHandler(async (req: Request, res: Response) => {
    // const data = await service.uploadReport(req.body);
    if (!req.file) throw new AppError(400, ' Report file is required');

    const { patientId, testId, orderId } = req.body;
    const payload = {
      patientId,
      testId,
      orderId,
      uploadBy: req.user?._id,
      reportUrl: `/uploads/reports/${req.file.filename}`,
      fileType: req.file?.mimetype,
      status: 'UPLOADED',
      uploadedAt: new Date(),
    };
    const uploadData = await service.uploadReport(payload);
    const result: APIResponse<typeof uploadData> = {
      success: true,
      message: 'Upload Report successfully',
      data: uploadData,
    };
    res.status(201).json(result);
  });
  getAllReport = asyncHandler(async (req: Request, res: Response) => {
    const getData = await service.getAllReport();
    const result: APIResponse<typeof getData> = {
      success: true,
      message: 'fetched data successfully',
      data: getData,
    };
    res.status(200).json(result);
  });
  reUploadReport = asyncHandler(async(req: Request, res: Response)=>{
   if(!req.file) throw new AppError(400," required file is required")
   
    const reUploadData  =await service.reUploadData(req.params.id, req.user!._id, req.file)
    const result: APIResponse<typeof reUploadData>={
    success: true,
    message: "ReUpload Data successfully",
    data: reUploadData
    }
    res.status(200).json(result);
  })

  GetSingleReport = asyncHandler(async (req: Request, res: Response) => {
    const singleData = await service.getReportById(req.params.id);
    const result: APIResponse<typeof singleData> = {
      success: true,
      message: 'Fetched Single Data',
      data: singleData,
    };
    res.status(200).json(result);
  });

  getReportsByPatient = asyncHandler(async(req: Request, res: Response)=>{
    const SingleByPatient = await service.GetByPatient(req.params.id);
    const result : APIResponse<typeof SingleByPatient>={
        success: true,
        message: "Patient Data fetched successfully",
        data: SingleByPatient
    }
    res.status(200).json(result);
  })
  updateReports = asyncHandler(async (req: Request, res: Response) => {
    const updatedData = await service.updateReport(req.params.id, req.body);
    const result: APIResponse<typeof updatedData> = {
      success: true,
      message: 'updated Data successfully',
      data: updatedData,
    };
    res.status(200).json(result);
  });
  verifyReport = asyncHandler(async (req: Request, res: Response) => {
    const reportId = req.params.id;

    const verifyData = await service.verifyReport(reportId, req.user?._id);
    const result: APIResponse<typeof verifyData> = {
      success: true,
      message: 'Report verified Successfully',
      data: verifyData,
    };
    res.status(200).json(result);
  });
  softDeletedData = asyncHandler(async (req: Request, res: Response) => {
    const deletedData = await service.SoftDeleted(req.params.id);
    const result: APIResponse<typeof deletedData> = {
      success: true,
      message: 'Deleted Data succssfully',
      data: deletedData,
    };
    res.status(200).json(result);
  });
}
