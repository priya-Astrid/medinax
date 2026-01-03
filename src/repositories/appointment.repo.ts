import { Appointment, AppointmentDocument } from '../models/appointment.model';
import { Doctor } from '../models/doctor.model';
import { buildQuery } from '../utils/buildQuery';
export class AppointmentRepo {
  async findDoctorById(doctorId: any) {
    return await Doctor.findById(doctorId);
  }

  async createAppointment(data: any) {
    return await Appointment.create(data);
  }

  async findAppointmentConflict(doctorId: any, date: Date, timeslot: string) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return await Appointment.findOne({
      doctorId,
      appointmentDate: { $gte: start, $lte: end },
      timeslot,
    });
  }
  async GetAllAppointment(query: any) {
    const { filter, options } = buildQuery(query);
    const data = await Appointment.find(filter, null, options);
    const total = await Appointment.countDocuments(filter);
    return {
      data,
      total,
      page: Math.ceil(options.skip / options.limit) + 1,
      limit: options.limit,
    };
    // return await Appointment.find();
  }
  async getByIdData(doctorId: string) {
    return await Appointment.findById(doctorId).populate('doctorId');
  }
  async findById(id: string) {
    return await Appointment.findById(id);
  }
  async updateById(id: string, data: any) {
    return await Appointment.findByIdAndUpdate(id, data, { new: true });
  }
  async GetDoctorAppointment(id: string, date: string) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return await Appointment.find({
      doctorId: id,
      appointmentDate: { $gte: start, $lte: end },
    }).populate('doctorId');
  }
  async findDoctorIdAppointment(doctorId: any) {
    return await Appointment.find({ doctorId: doctorId }).populate('doctorId');
  }
  async findPatientIdAppointment(id: string) {
    return await Appointment.find({ patientId: id }).populate('patientId');
  }
  async GetUpcoming(id: string) {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return await Appointment.find({
      doctorId: id,
      appointmentDate: {
        $gte: start,
        $lte: end,
      },
      status: { $in: ['BOOKED', 'PENDING'] },
    }); //populate("doctorId patientId")
  }
}

// medinax backend api create ho gai hai auth, patient , doctor  module se related
