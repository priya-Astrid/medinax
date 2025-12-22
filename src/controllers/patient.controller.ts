import { Request, Response } from 'express';
import { PatientService } from '../services/patient.service';
import { APIResponse } from '../dtos/common/response.dto';
import { asyncHandler } from '../utils/asyncHandler';

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

  getPatientProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.patientId;
    const profile = await service.getProfileBy(userId);
    const response: APIResponse<typeof profile> = {
      success: true,
      message: 'profile fetched successfully',
      data: profile,
    };
    res.status(200).json(response);
  });

  updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.params.patientId;

    const profileData = {
      ...req.body,
      image: req.file?.filename,
    };
    console.log('sfsds sdf', profileData);
    console.log('this is data', userId);
    const result = await service.updateProfile(userId, profileData);
    const response: APIResponse<typeof result> = {
      success: true,
      message: 'profile update successfully',
      data: result,
    };
    res.status(200).json(response);
  });
  deletePatient = asyncHandler(async (req: Request, res: Response) => {
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
}

// import { Request, Response } from 'express';
// import { PatientService } from '../services/patient.service';
// import { APIResponse } from '../dtos/common/response.dto';

// const service = new PatientService();

// export class PatientController {
//   async create(req: Request, res: Response) {
//     try {
//       const patient = await service.createPatient(req.body);

//       const response: APIResponse<typeof patient> = {
//         success: true,
//         message: 'Patient created successfully',
//         data: patient,
//       };
//       res.status(201).json(response);
//     } catch (error: any) {
//       res.status(400).json({ success: false, message: error.message });
//     }
//   }

//   async getAll(req: Request, res: Response) {
//     const patients = await service.getAllPatients();
//     res.json(patients);
//   }

//   async getOne(req: Request, res: Response) {
//     const patient = await service.getPatientById(req.params.id);
//     if (!patient) return res.status(404).json({ message: 'Not found' });
//     res.json(patient);
//   }

//   async update(req: Request, res: Response) {
//     const patient = await service.updatePatient(req.params.id, req.body);
//     res.json(patient);
//   }

//   async delete(req: Request, res: Response) {
//     await service.deletePatient(req.params.id);
//     res.status(204).send();
//   }
// }
