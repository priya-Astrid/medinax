import { PaginationDto } from '../dtos/common/request.dto';
import { userRepository } from '../repositories/auth.repo';
import { DoctorRepository } from '../repositories/doctor.repository';
import { AppError } from '../utils/AppError';
import { deleteImageFile } from '../utils/deleteImageFile';
import { DoctorProfileResponse } from '../utils/response.utils';

export class doctorService {
  private repo: DoctorRepository;
  private userRepo = new userRepository();
  constructor() {
    this.repo = new DoctorRepository();
  }
  // async createProfile(data: any) {
  //   return await this.repo.create(data);
  // }
  async getAllDoctor(query: any) {
    return this.repo.find(query);
  }
  async getSingleDoctor(doctorId: string) {
    const doctor = await this.repo.findById(doctorId);
    if (!doctor) throw new AppError(404, 'doctor not found');
    return doctor;
  }
  async getDoctorProfile(doctorId:string){
    const doctor = await this.repo.findById(doctorId);
    if(!doctor) throw new AppError(404, 'doctor not found');
    if(doctor.isDeleted) {
      throw new AppError(404, "doctor profile deleted");
    }
    return doctor;
  }
  // async getAllDoctorPagi(Pagination: PaginationDto) {
  //   return this.repo.getAllDoctorData(Pagination);
  // }
  async imageUploadProfile(userId: string, data: { image: string }) {
    console.log('servdfdf adasdsa', userId);
    const doctor = await this.repo.findByUserId(userId);

    if (!doctor) {
      deleteImageFile(`doctors/${data.image}`);
      throw new AppError(404, 'doctor not found');
    }
    if (doctor.image) {
      const oldFile = doctor.image.split('/uploads/')[1];
      deleteImageFile(oldFile);
    }
    const imageUrl = `${process.env.BASE_URL}/doctors/${data.image}`;
    doctor.image = imageUrl;

    await doctor.save();
    return doctor;
  }

  async updateDoctorByAdmin(userId: string, data: any) {
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
    const DoctorUpdate: any = {};
    if (data.specialization) DoctorUpdate.specialization = data.specialization;
    if (data.department) DoctorUpdate.department = data.department;
    if (data.fees) DoctorUpdate.fees = data.fees;
    if (data.qualifications) DoctorUpdate.qualifications = data.qualifications;
    if (data.experience) DoctorUpdate.experience = data.experience;
    if (data.availableDays) DoctorUpdate.availableDays = data.availableDays;

    if (data.availableTime) DoctorUpdate.availableTime = data.availableTime;

    const updatedDoctor = await this.repo.upsertByUserId(userId, DoctorUpdate);
   
    return DoctorProfileResponse(user, updatedDoctor);
  }

  async updateDoctorProfile(userId:string, data: any){
   const user =await this.userRepo.getByIdUser(userId);
   if(!user) throw new AppError(404, 'user not found');
   if(data.firstname) user.firstname = data.firstname;;
   if(data.lastname) user.lastname = data.lastname;
   await user.save();

   const updatedProfile : any ={};
   if(data.availableDays) updatedProfile.availableDays =data.availableDays;
   if(data.availableTime) updatedProfile.availableTime = data.availableTime;
   if(data.qualifications) updatedProfile.qualifications = data.qualifications;
   const doctor = await this.repo.upsertByUserId(userId, updatedProfile);

   return DoctorProfileResponse(user, doctor);

  }
  // async updateById(id: string, data: any) {
  //   return this.repo.findByIdUpdate(id, data);
  // }
  async deletedoctor(id: string) {
    return this.repo.findByIdDelete(id);
  }
  async searchdoctor(data: any) {
    return this.repo.findData(data);
  }
  async addSchedule(doctorId: string, schedule: any) {
    const doctor = await this.repo.findById(doctorId);
    if (!doctor) throw new AppError(404, 'Doctor not found');
    doctor.schedule = schedule;
    await doctor.save();
    return doctor;
  }
  async toggleStatus(doctorId: string, isActive: boolean, userId: any) {
    const doctor = await this.repo.findById(doctorId);
    if (!doctor) throw new AppError(404, 'doctor not found');

    doctor.isActive = isActive;
    doctor.updatedBy = userId;
    doctor.updatedAt = new Date();

    doctor.save();
    return doctor;
  }
  async deleteDoctor(doctorId: string, adminId: string) {
    const doctor = await this.repo.softDeleteById(doctorId, adminId);
    if (!doctor) throw new AppError(404, 'doctor not found');
    return doctor;
  }

  async doctorSpecialize(specialization: string) {
    return this.repo.doctorSpecialize(specialization);
  }
}
