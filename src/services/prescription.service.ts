import { prescriptionDocument } from '../models/prescription.model';
import { prescriptionRepo } from '../repositories/prescription.repo';
import { AppError } from '../utils/AppError';

export class prescriptionService {
  private Repo = new prescriptionRepo();

  async pricriptionAdd(data: Partial<prescriptionDocument>) {
    if (!data.doctorId) throw new AppError(400, 'dotor is reuired');
    if (!data.patientId) throw new AppError(400, 'patient is reuired');
    if (!data.appointmentId) throw new AppError(400, 'Appointment is required');

    return this.Repo.createData(data);
  }
  async getDataList(query: any) {
    return this.Repo.getData(query);
  }
  async updatePrescription(id: string, data: Partial<prescriptionDocument>) {
    const prescription = await this.Repo.findById(id);
    if (!prescription) throw new AppError(404, 'prescription not found');
    if (prescription.status === 'finalized')
      throw new AppError(400, 'finalized prescription can not be update');

    return this.Repo.updateData(id, data);
  }
  async softdeleteData(id: string) {
    const prescription = await this.Repo.findById(id);
    if (!prescription) throw new AppError(404, 'Prescription not found');
    if (prescription.status === 'finalized')
      throw new AppError(400, 'finalized prescription cannot be deleted');
    return this.Repo.deleteData(id);
  }
}
