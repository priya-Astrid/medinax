import { PatientRepository } from '../repositories/patient.repo';
import { AppError } from '../utils/AppError';
import { userRepository } from '../repositories/auth.repo';
import { deleteImageFile } from '../utils/deleteImageFile';
import path from 'path';

export class PatientService {
  private patientRepo = new PatientRepository();
  private userRepo = new userRepository();

  async getAllPatients(query: any) {
    return await this.patientRepo.findAll(query);
  }
  async singlePatient(userId: string) {
    const patientData = await this.patientRepo.findByUserId(userId);
    if (!patientData) throw new AppError(404, 'patient not found');
    return patientData;
  }
  async getProfileBy(userId: string) {
    const profile = await this.patientRepo.findByUserId(userId);
    if (!profile) throw new AppError(404, 'patient profile not found');
    return profile;
  }
  async patientProfile(userId: string) {
    const profileData = await this.patientRepo.findByUserId(userId);
    if (!profileData) throw new AppError(404, 'Patient not found');
    if (profileData.isDeleted) {
      throw new AppError(400, 'patient is deleted');
    }
    return profileData;
  }
  async updateProfileImage(userId: string, data: { image: string }) {
    const patient = await this.patientRepo.findByUserId(userId);
    if (!patient) {
      deleteImageFile(`patients/${data.image}`);
      throw new AppError(404, 'Patient not found');
    }

    if (patient.image) {
      const oldFile = patient.image.split('/uploads/')[1];
      deleteImageFile(oldFile);
    }
    const imageUrl = `${process.env.BASE_URL}/patients/${data.image}`;

    patient.image = imageUrl;
    await patient.save();

    return patient;
  }

  async updateProfile(userId: string, data: any) {
    // update auth-level fields if psresent (name, emai, password etc)
    const user = await this.userRepo.getByIdUser(userId);

    if (!user) throw new AppError(404, 'Patient not found');

    let changed = false;
    if (data.firstname) {
      user.firstname = data.firstname;
      changed = true;
    }
    if (data.lastname) {
      user.lastname = data.lastname;
      changed = true;
    }

    if (changed) await user.save();
    //  update patient specific fields
    const patientUpdate: any = {};
    if (typeof data.age !== 'undefined') patientUpdate.age = Number(data.age);
    if (data.gender) patientUpdate.gender = data.gender;
    if (data.address) patientUpdate.address = data.address;
    if (data.dateOfBirth) patientUpdate.dateOfBirth = data.dateOfBirth;
    if (data.emergencyContact)
      patientUpdate.emergencyContact = data.emergencyContact;

    const updatedProfile = await this.patientRepo.upsertByUserId(
      userId,
      patientUpdate,
    );
    return updatedProfile;
    // return { user: user.toObject(), patient: updatedProfile };
  }
  async adminUpdateProfile(userId: string, data: any) {
    const user = await this.userRepo.getByIdUser(userId);
    if (!user) throw new AppError(404, 'user not found');
    const patientUpdate: any = {};
    if (data.bloodGroup) patientUpdate.bloodGroup = data.bloodGroup;
    if (data.medicalHistory) patientUpdate.medicalHistory = data.medicalHistory;
    const updatedProfile = await this.patientRepo.upsertByUserId(
      userId,
      patientUpdate,
    );
    return updatedProfile;
  }
  async deletePatient(deleteId: string, userId: string) {
    const patient = await this.patientRepo.deletePatient(deleteId, userId);
    if (!patient) throw new AppError(404, 'patient not found');
    return patient;
  }
  async restorePatient(id: string) {
    if (!id) throw new AppError(501, 'Not implemented yet');
    return this.patientRepo.restoreData(id);
  }
  async toggleStatusData(id: string, userId: string, isActive: boolean) {
    const patient = await this.patientRepo.findByUserId(id);
    if (!patient) throw new AppError(404, 'patient not found');

    patient.isActive = isActive;
    patient.updatedAt = new Date();
    patient.updatedBy = userId;
    patient.save();
    return patient;
  }
}
