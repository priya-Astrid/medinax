import { Request, Response} from 'express';
import { APIResponse } from '../dtos/common/response.dto';
import { AppointmentService } from '../services/appointment.service';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';

const service = new AppointmentService();

export class AppointmentController {
  // Apppointment Book api
  createAppointment = asyncHandler(
    async (req: Request, res: Response) => {
      const appointmentData = await service.createAppointment(req.body);
      const response: APIResponse<typeof appointmentData> = {
        success: true,
        message: 'book appointment successfully',
        data: appointmentData,
      };
      res.status(200).json(response);
    },
  );
  // get all Appointment
  getAllAppointment = asyncHandler(
    async (req: Request, res: Response) => {
      const getappointment = await service.getAllappoint(req.query);
      const response: APIResponse<typeof getappointment> = {
        success: true,
        message: 'appointment fetched successfully',
        data: getappointment,
      };
      res.status(200).json(response);
    },
  );
  // get Single Appointment
  getOneAppointment = asyncHandler(
    async (req: Request, res: Response) => {
      const getSingleAppointment = await service.getAppointmentById(
        req.params.id,
      );
      const response: APIResponse<typeof getSingleAppointment> = {
        success: true,
        message: 'Appointment Get Successfully',
        data: getSingleAppointment,
      };
      res.status(200).json(response);
    },
  );
  // get doctot By Id Appointment List
  getByDoctor = asyncHandler(
    async (req: Request, res: Response) => {
      const getDoctorByIdlist = await service.getDoctorByIdList(req.params.id);
      const response: APIResponse<typeof getDoctorByIdlist> = {
        success: true,
        message: 'Get single Doctor Appointment List',
        data: getDoctorByIdlist,
      };
      res.status(200).json(response);
    },
  );

  // get patient Appointment history List
  getByPatient = asyncHandler(
    async (req: Request, res: Response) => {
      const getappointmentlist = await service.getAppointmentPatient(
        req.params.id,
      );
      const response: APIResponse<typeof getappointmentlist> = {
        success: true,
        message: 'Patient fetch apointment-history',
        data: getappointmentlist,
      };
      res.status(200).json(response);
    },
  );

  // update status Appointment
  updateStatus = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const { status } = req.body;
      const statusData = await service.updateStatus(id, status);
      const response: APIResponse<typeof statusData> = {
        success: true,
        message: 'Appointment status update',
        data: statusData,
      };
      res.status(200).json(response);
    },
  );

  // update the notes appointment
  updateNotes = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const data = req.body;

      const notesUpdate = await service.updateNotes(id, data);
      const response: APIResponse<typeof notesUpdate> = {
        success: true,
        message: 'Appointment notes update',
        data: notesUpdate,
      };
      res.status(200).json(response);
    },
  );
  // cancel Appointment (soft Delete) api
  cancelAppointment = asyncHandler(
    async (req: Request, res: Response) => {
      const id = req.params.id;
      const { reason } = req.body;
      // const userId = req.user?._id;
      const cancelAppointment = await service.cancelappointment(id, reason);
      const response: APIResponse<typeof cancelAppointment> = {
        success: true,
        message: 'Appointment Cancel Successfully ',
        data: cancelAppointment,
      };
      res.status(200).json(response);
    },
  );
  // doctor appointment Date via
  getByDoctorAndDate = asyncHandler(
    async (req: Request, res: Response) => {
      const { doctorId } = req.params;
      const date = req.query.date as string;
      if (!date || typeof date !== 'string') {
        throw new AppError(400, ' Date is required');
      }
      const data = await service.getAppointment(doctorId, date);
      const response: APIResponse<typeof data> = {
        success: true,
        message: 'Doctor appointment fetched successfully',
        data: data,
      };
      res.status(200).json(response);
    },
  );
  // get Upcoming Appointment
  getUpcomingAppointment = asyncHandler(
    async (req: Request, res: Response) => {
      const upcomingDate = await service.GetUpcomingDate(req.params.id);
      const response: APIResponse<typeof upcomingDate> = {
        success: true,
        message: 'Doctor Upcoming Appointment fetched Successfully',
        data: upcomingDate,
      };
      res.status(200).json(response);
    },
  );
  // reschedule appointment
  rescheduleAppointment = asyncHandler(
    async (req: Request, res: Response) => {
      const appointmentId = req.params.id;
      const update = req.body;
      const rescheduleData = await service.rescheduleData(
        appointmentId,
        update,
      );
      const response: APIResponse<typeof rescheduleData> = {
        success: true,
        message: 'Reschedule Appontment successfully',
        data: rescheduleData,
      };
      res.status(200).json(response);
    },
  );
}
