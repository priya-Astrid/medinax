import { AppError } from '../utils/AppError';
import { MedicalHistoryRepo } from '../repositories/medicalHistory.repo';
import { appointmentRepo } from '../repositories/appointment.repo';

export class MedicalHistoryService {
  private repo: MedicalHistoryRepo;
  private appointmentRepo: appointmentRepo;
  constructor() {
    this.repo = new MedicalHistoryRepo();
    this.appointmentRepo = new appointmentRepo();
  }
  async createMedicalHistory(data: any) {
    const { patientId, doctorId, visitDate } = data;

    if (!visitDate) {
      throw new AppError(400, 'visitDate is required');
    }
    const appointment = await this.appointmentRepo.findById(data.appointmentId);
    if (!appointment) {
      throw new AppError(404, 'Appointment not found');
    }
    if (appointment.status !== 'COMPLETED') {
      throw new AppError(
        400,
        'Medical history create only after appointment completion',
      );
    }

    if (
      appointment.patientId.toString() !== data.patientId ||
      appointment.doctorId.toString() !== data.doctorId
    ) {
      throw new AppError(400, 'Appoimtent data mismatch');
    }
    const existHistory = await this.repo.findByAppointmentid(
      data.appointmentId,
    );
    if (existHistory) {
      throw new AppError(400, 'medical history already for this appointment');
    }

    const date = new Date(visitDate);

    const startOfDate = new Date(date.setHours(0, 0, 0, 0));

    const endOfDate = new Date(date.setHours(23, 59, 59, 999));

    const existingData = await this.repo.findExistingVisit(
      patientId,
      doctorId,
      startOfDate,
      endOfDate,
    );
    if (existingData)
      throw new AppError(400, 'medicalhistory already visit same date');

    if (!data.patientId) {
      throw new AppError(400, 'patient is required');
    }
    const record = await this.repo.createMedicaHistory(data);

    return record;
  }
  async getAllRecords(query: any) {
    return this.repo.findData(query);
  }
  async getSingleData(id: string) {
    return this.repo.findOneData(id);
  }
  async updateDataRecord(id: string, data: string) {
    const updateData = await this.repo.updateData(id, data);
    if (!updateData) throw new AppError(400, 'patient id not found');
    return updateData;
  }
  async getSearchData(query: any) {
    return this.repo.searchData(query);
  }
  async softDelete(id: string){
    return this.repo.softDeleteData(id)
  }
  async restoreData(id: string){
    return this.repo.restoreData(id)
  }
}
