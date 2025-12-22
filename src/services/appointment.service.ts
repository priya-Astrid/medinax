import { Appointment, AppointmentDocument } from '../models/appointment.model';
import { appointmentRepo } from '../repositories/appointment.repo';
import { AppError } from '../utils/AppError';

export class AppointmentService {
  private repo: appointmentRepo;
  constructor() {
    this.repo = new appointmentRepo();
  }
  async createAppointment(data:any) {
    try {
      const doctor = await this.repo.findDoctorById(data.doctorId);
      if (!doctor) throw new AppError(404, 'doctor not found');

      const dayName = new Date(data.appointmentDate).toLocaleString('en-US', {
        weekday: 'long',
      });

      const isAvailable = doctor.availableDays?.some(
        (day: string) => day.toLowerCase() === dayName.toLowerCase(),
      );
      if (!isAvailable) {
        throw new AppError(404, `doctor not available on ${dayName}`);
      }

      const conflict = await this.repo.findAppointmentConflict(
        data.doctorId,
        data.appointmentDate,
        data.timeslot,
      );
      if (conflict) throw new AppError(400, 'this time slot is already book');
      
      return this.repo.createAppointment(data);
      // const appointment = await Appointment.create(data);
      // return appointment;
    } catch (error) {
      throw error;
    }
  }
  async getAllappoint(query: any) {
    return this.repo.GetAllAppointment(query);
  }
  async getAppointmentById(id: string) {
    return this.repo.getByIdData(id);
  }
  async getDoctorByIdList(id: string) {
    const appointmentList = await this.repo.findDoctorIdAppointment(id);
    if (!appointmentList || appointmentList.length === 0)
      throw new AppError(400, 'not found appointment this doctors ');
    return appointmentList;
  }
  async getAppointmentPatient(id: string) {
    const appointmentlist = await this.repo.findPatientIdAppointment(id);
    if (!appointmentlist || appointmentlist.length === 0)
      throw new AppError(400, 'not found appointment this patient');
    return appointmentlist;
  }
  async updateStatus(id: string, status: string) {
    const validStatus = ['BOOKED', 'COMPLETED', 'CANCELLED', 'PENDING'];
    if (!validStatus.includes(status)) {
      throw new AppError(400, 'Invalid appointment status');
    }

    const apppointment = await this.repo.updateById(id, { status });
    if (!apppointment) throw new AppError(404, 'Appointment not found');

    return apppointment;
  }
  async updateNotes(id: string, notes: any) {
    const appointment = await this.repo.updateById(id, notes);
    if (!appointment) throw new AppError(404, 'Appointment not found');
    return appointment;
  }
  async cancelappointment(id: string, reason: string) {
    const appointment = await this.repo.findById(id);
    if (!appointment) throw new AppError(404, 'Appointment not found');

    if (appointment.status === 'COMPLETED')
      throw new AppError(400, 'can not cancel completed appointment ');

    if (appointment.status === 'CANCELLED')
      throw new AppError(404, 'already cancel appointment');

    const updateData = {
      status: 'CANCELLED',
      cancelReason: reason || 'no reason provided',
      cancelledBy: null,
      cancelDate: new Date(),
    };
    const updateAppointment = await this.repo.updateById(id, updateData);
    return updateAppointment;
  }
  async getAppointment(id: string, date: string) {
    return this.repo.GetDoctorAppointment(id, date);
  }
  async GetUpcomingDate(id: string) {
    return this.repo.GetUpcoming(id);
  }
  async rescheduleData(appoinmentId: string, update: any) {
    // const appointment = await this.repo.updateById(appoinmentId, update);
    const appointment = await this.repo.findById(appoinmentId);

    if (!appointment) throw new AppError(404, 'Appointment not found');

    if (appointment.status === 'CANCELLED') {
      throw new AppError(400, 'cancelled appointment can not be reschedule');
    }
    if (new Date(update.newDate) < new Date()) {
      throw new AppError(400, ' can not reschedule to past date');
    }
    const doctor = await this.repo.findDoctorById(appointment.doctorId);
    if (!doctor) throw new AppError(404, 'doctor not found');

    //  const availableDays = doctor.availableDays;
    const dayName = new Date(update.newDate).toLocaleString('en-US', {
      weekday: 'long',
    });

    const isAvailable = doctor.availableDays?.some(
      (day: string) => day.toLowerCase() === dayName.toLowerCase(),
    );
    if (!isAvailable) {
      throw new AppError(404, `doctor not available on ${dayName}`);
    }

    const conflict = await this.repo.findAppointmentConflict(
      appointment.doctorId,
      update.newDate,
      update.newTime,
    );
    if (conflict) throw new AppError(400, 'this time slot is already book');

    console.log('this is config', conflict);
    // Store old date/time
    appointment.previousDate = appointment.appointmentDate;
    appointment.previousTime = appointment.timeslot;

    // Update new date/time
    appointment.appointmentDate = update.newDate;
    appointment.timeslot = update.newTime;

    // Mark rescheduled
    appointment.isReschedule = true;

    await appointment.save();

    return appointment;
  }
}
