import { truncate } from 'node:fs';
import { LabReport, LabReportDocument } from '../models/labReport.model';

export class LabReportRepository {
  async uploadReportData(data: Partial<LabReportDocument>) {
    return LabReport.create(data);
  }
  async getAllReport() {
    return LabReport.find();
  }
  async updateReport(id: string, data: Partial<LabReportDocument>) {
    return LabReport.findByIdAndUpdate(id, data);
  }
  async getReportById(id: string) {
    return LabReport.findById(id)
      .populate('patientId')
      .populate('testId')
      .populate('orderId')
      .lean();
  }
  async reUploadData(id: string, data: Partial<LabReportDocument>) {
    return LabReport.findByIdAndUpdate(
      id,
      { ...data, status: 'UPLOADED' },
      { new: true },
    );
  }
  async getReportByPatient(patientId: string) {
    return LabReport.find({ patientId, isDeleted: false })
      .populate('testid')
      .sort({ uploadedAt: -1 })
      .lean();
  }
  async softDelete(id: string, userId : string) {
    return LabReport.findByIdAndUpdate(
      id,
      { isDeleted: true, isActive: false, DeletedBy:userId, DeletedAt: new Date() },
      { new: true },
    );
  }
}
