import { ObjectId } from 'mongoose';
import { LabReportDocument } from '../models/labReport.model';
import { LabReportRepository } from '../repositories/labReport.repo';

export class LabReportService {
  private Repository = new LabReportRepository();
  async uploadReport(data: any) {
    return this.Repository.uploadReportData(data);
  }
  async getAllReport() {
    return this.Repository.getAllReport();
  }
  async updateReport(id: string, data: Partial<LabReportDocument>) {
    return this.Repository.updateReport(id, data);
  }
  async verifyReport(id: string, verifiedBy: ObjectId) {
    return this.Repository.updateReport(id, {
      status: 'VERIFIED',
      verifiedBy,
      verifiedAt: new Date(),
    });
  }
  async reUploadData(
    id: string,
    userId: ObjectId,
    file: Express.Multer.File,
  ) {
    return this.Repository.reUploadData(id, {
      reportUrl: `/uploads/reports/${file.filename}`,
      fileType: file.mimetype,
      reUploadBy: userId,
      reUploadAt: new Date(),
      verifiedBy: undefined,
      verifiedAt: undefined,
    });
  }async reUploadReport(id: string, userId: ObjectId, file: Express.Multer.File) {
  return this.Repository.reUploadData(id, {
    reportUrl: `/uploads/reports/${file.filename}`,
    fileType: file.mimetype,
    reUploadBy: userId,
    reUploadAt: new Date(),
    verifiedBy: undefined,
    verifiedAt: undefined,
  });
}
  async getReportById(id: string) {
    return this.Repository.getReportById(id);
  }
  async GetByPatient(id: string) {
    return this.Repository.getReportByPatient(id);
  }
  async SoftDeleted(id: string) {
    return this.Repository.softDelete(id);
  }
}
