import { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';
import { AppError } from '../utils/AppError';
import { file } from 'zod';
import { deleteImageFile } from '../utils/deleteImageFile';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

const service = new PatientService();

export class PatientController {
  getAllPatients = asyncHandler(async (req: Request, res: Response) => {
    const getPatient = await service.getAllPatients(req.query);
    const response: APIResponse<typeof getPatient> = {
      success: true,
      message: 'Patient data fetched succesfully',
      data: getPatient,
    };
    res.status(200).json(response);
  });

  getPatientByAdmin = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.patientId;
    const profile = await service.getProfileBy(userId);
    const response: APIResponse<typeof profile> = {
      success: true,
      message: 'profile fetched successfully',
      data: profile,
    };
    res.status(200).json(response);
  });
  singlePatientData = asyncHandler(async (req: Request, res, Response) => {
    const singleData = await service.singlePatient(req.params.id);
    const result: APIResponse<typeof singleData> = {
      success: true,
      message: 'single patient data fetched successfully',
      data: singleData,
    };
    res.status(200).json(result);
  });
  getPatientProfile = asyncHandler(async(req: AuthenticatedRequest, res: Response)=>{
   if(!req.user?.id){ 
    throw new AppError(401, 'unauthorized access')
   }
   const userId = req.user.id;
   const updateProfile = await service.patientProfile(userId);
   const result : APIResponse<typeof updateProfile>={
    success : true,
    message : "Patient profile Fetched successfully",
    data: updateProfile
   }
   res.status(200).json(result);
  })
  imageUpdateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.patientId;
    if (!req.file) {
      throw new AppError(400, 'image file is required');
    }
    try {
      const result = await service.updateProfileImage(userId, {image: req.file.filename});
      const response: APIResponse<typeof result> = {
        success: true,
        message: 'update Profile Image successfully',
        data: result,
      };

      res.status(200).json(response);
    } catch (error) {
       deleteImageFile(`patients/${req.file.filename}`);
      throw error;
    }
  });

  updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if(!req.user?.id) {
    throw new AppError(401, 'unauthorized access');
  }
    const userId = req.user.id;

    const profileData = req.body;

    const result = await service.updateProfile(userId, profileData);
    const response: APIResponse<typeof result> = {
      success: true,
      message: 'profile update successfully',
      data: result,
    };
    res.status(200).json(response);
  });
  adminUpdateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.patientId;
    const profileData = req.body;

    const result = await service.adminUpdateProfile(userId, profileData);
    const response: APIResponse<typeof result> = {
      success: true,
      message: 'admin updated patient profile successfully',
      data: result,
    };
    res.status(200).json(response);
  });
  softDeletePatient = asyncHandler(async (req: Request, res: Response) => {
    const deleteId = req.params.id;
    const userId = req.user.id;
    const deleteData = await service.deletePatient(deleteId, userId);
    const result: APIResponse<typeof deleteData> = {
      success: true,
      message: 'patient delete successfully',
      data: deleteData,
    };
    res.status(200).json(result);
  });
  restorePatient = asyncHandler(async (req: Request, res: Response) => {
    const restoreData = await service.restorePatient(req.params.id);
    const result: APIResponse<typeof restoreData> = {
      success: true,
      message: 'restore patient successfully',
      data: restoreData,
    };
    res.status(200).json(result);
  });
  toggleStatus = asyncHandler(async (req: Request, res: Response) => {
    const patientId = req.params.id;
    const adminId = req.user.id;
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      throw new AppError(400, 'isActive must be boolean ');
    }
    const toggleData = await service.toggleStatusData(
      patientId,
      adminId,
      isActive,
    );
    const result: APIResponse<typeof toggleData> = {
      success: true,
      message: `patient ${isActive} ?'activate':'deactivate' successfully`,
      data: toggleData,
    };
    res.status(200).json(result);
  });
}
