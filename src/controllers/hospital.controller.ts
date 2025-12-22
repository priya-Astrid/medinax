import { Request, Response } from 'express';
import { HospitalService } from '../services/hospital.service';
import { APIResponse } from '../dtos/common/response.dto';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';

const service = new HospitalService();

export class HospitalController {
  create = asyncHandler(async (req, res) => {
    const hospital = await service.createHospital(req.body);
    res.status(201).json({
      success: true,
      message: 'Hospital created successfully',
      data: hospital,
    });
  });

  getAllHospitalData = asyncHandler(async (req, res) => {
    const data = await service.getAllData();
    res.json({ success: true, data });
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new AppError(400, 'Invalid ID');

    const hospital = await service.gethospitalById(id);
    if (!hospital) throw new AppError(404, 'Hospital not found');

    res.json({ success: true, data: hospital });
  });

  updateHospitalData = asyncHandler(async (req, res) => {
    const hospital = await service.updateData(req.params.id, req.body);
    res.json({ success: true, data: hospital });
  });

  softDelete = asyncHandler(async (req, res) => {
    await service.deleteData(req.params.id);
    res.json({ success: true, message: 'Hospital deleted' });
  });
}

