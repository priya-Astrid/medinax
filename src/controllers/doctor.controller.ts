import { Request, Response, NextFunction, response } from 'express';
import { APIResponse } from '../dtos/common/response.dto';
import { doctorService } from '../services/doctor.service';
import { AppError } from '../utils/AppError';
import { availableMemory } from 'process';
import { asyncHandler } from '../utils/asyncHandler';

const service = new doctorService();

export class DoctorController {
  //   create doctor
  // async createDoctor(req: Request, res: Response) {
  //   try {
  //     const doctor = await service.createProfile(req.body);
  //     const response: ApIResponse<typeof doctor> = {
  //       success: true,
  //       message: 'DoctorProfile created successfully',
  //       data: doctor,
  //     };
  //     res.status(200).json(response);
  //   } catch (error: any) {
  //     res.status(400).json({ success: false, message: error.message });
  //   }
  // }
  //   getAllDoctor data
  getAllDoctors = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await service.getAllDoctor(req.query);
    const response: APIResponse<typeof doctor> = {
      success: true,
      message: 'Fetched  data successfully',
      data: doctor,
    };
    res.status(200).json(response);
  });
  getSpecializations = asyncHandler(async (req: Request, res: Response) => {
    const specialization = req.query.specialization as string;
    if (!specialization) throw new AppError(400, 'specialization is required');

    const doctorListData = await service.doctorSpecialize(specialization);
    const result: APIResponse<typeof doctorListData> = {
      success: true,
      message: 'Doctor fetch data successfully',
      data: doctorListData,
    };
    res.status(200).json(result);
  });
  // async getAllDcotorPagination(req: Request, res: Response) {
  //   try {
  //     const { page, limit, sortBy, sortOrder } = req.query;
  //     const Pagination = {
  //       page: Number(page) || 1,
  //       limit: Number(limit) || 10,
  //       sortBy: (sortBy as string) || 'createAt',
  //       sortOrder: (sortOrder as 'asc' | 'desc') || 'desc',
  //     };
  //     const doctorData = await service.getAllDoctorPagi(Pagination);
  //     const response: APIResponse<typeof doctorData> = {
  //       success: true,
  //       message: 'fetched data successfully',
  //       data: doctorData,
  //     };
  //     res.status(200).json(response);
  //   } catch (error: any) {
  //     res.status(400).json({ success: false, message: error.message });
  //   }
  // }
  //   getById data
  getDoctorById = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await service.getById(req.params.id);
    const response: APIResponse<typeof doctor> = {
      success: true,
      message: 'Fetch data successfully',
      data: doctor,
    };
    res.status(200).json(response);
  });
  // update doctor data
  updateDoctor = asyncHandler(async (req: Request, res: Response) => {
    const updatedoctor = await service.updateDoctorProfile(
      req.params.id,
      req.body,
    );
    const response: APIResponse<typeof updatedoctor> = {
      success: true,
      message: 'Doctor Updated Successfully',
      data: updatedoctor,
    };
    res.status(200).json(response);
  });
  //   search specialization and day Doctor
  searchDoctors = asyncHandler(async (req: Request, res: Response) => {
    const searchdoctor = await service.searchdoctor(req.query);
    const response: APIResponse<typeof searchdoctor> = {
      success: true,
      message: 'search data successfully',
      data: searchdoctor,
    };
    res.status(200).json(response);
  });

  addSchedule = asyncHandler(async (req: Request, res: Response) => {
    const doctor = await service.addSchedule(req.params.id, req.body.schedule);
    const result: APIResponse<typeof doctor> = {
      success: true,
      message: 'Doctor schedule added successfully',
      data: doctor,
    };
    res.status(200).json(result);
  });
  toggleStatus = asyncHandler(async (req: Request, res: Response) => {
    const doctorId = req.params.id;
    const adminId = req.user.id;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      throw new AppError(400, 'isActive must be boolean( true/false');
    }

    const activateDoctor = await service.toggleStatus(
      doctorId,
      isActive,
      adminId,
    );
    const result: APIResponse<typeof activateDoctor> = {
      success: true,
      message: `Doctor ${isActive ? 'activate' : 'deactivate'} successfully `,
    };
    res.status(200).json(result);
  });
  //  soft-delete doctor data
  deleteDoctor = asyncHandler(async (req: Request, res: Response) => {
    const deletedById = req.params.id;
    const adminId = req.user.id;
    const deleteDoctor = await service.deleteDoctor(deletedById, adminId);
    const result: APIResponse<typeof deleteDoctor> = {
      success: true,
      message: 'doctor soft delete successfully',
      data: deleteDoctor,
    };
    res.status(200).json(result);
  });
}
