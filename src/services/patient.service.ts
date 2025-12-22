import mongoose from 'mongoose';
import { Patient } from '../models/patient.model';
import { PatientRepository } from '../repositories/patient.repo';
import { Role } from '../models/role.model';
import { AppError } from '../utils/AppError';
import { userRepository } from '../repositories/auth.repo';

export class PatientService {
  private patientRepo = new PatientRepository();
  private userRepo = new userRepository();

  async getAllPatients(query:any) {
    return await this.patientRepo.findAll(query);
  }
  async getProfileBy(userId: string) {
    const profile = await this.patientRepo.findByUserId(userId);
    if (!profile) throw new AppError(404, 'patient profile not found');
    return profile;
  }

  async updateProfile(userId: string, data: any) {
    // update auth-level fields if psresent (name, emai, password etc)
    const user = await this.userRepo.getByIdUser(userId);
  
    if (!user) throw new AppError(404, 'user not found');
    
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
    if (data.medicalHistory) patientUpdate.medicalHistory = data.medicalHistory;
    if (data.dateOfBirth) patientUpdate.dateOfBirth = data.dateOfBirth;
    if (data.bloodGroup) patientUpdate.bloodGroup = data.bloodGroup;
    if (data.image) patientUpdate.image = data.image;
    if (data.emergencyContact)
      patientUpdate.emergencyContact = data.emergencyContact;

    const updatedProfile = await this.patientRepo.upsertByUserId(
      userId,
      patientUpdate,
    );
    return { user: user.toObject(), patient: updatedProfile };
  }
  async deletePatient(deleteId: string, userId: string) {
    const patient = await this.patientRepo.deletePatient(deleteId, userId);
    if (!patient) throw new AppError(404, 'patient not found');
    return patient;
  }
}