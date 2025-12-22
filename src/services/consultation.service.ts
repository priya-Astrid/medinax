import { consultationDocument } from "../models/consultation.model";
import { consultationRepository } from "../repositories/consultation.repo"

export class consultationService {
    private Repo = new consultationRepository();
    async createConsultation(data: Partial<consultationDocument>){
        return this.Repo.createConsultation(data);
    }
    async getAllConsultation(query: any){
        return this.Repo.getAllData(query);
    }
    async singleconsultation(id: string){
        return this.Repo.singledata(id);
    }
    async updateData(id: string, data: Partial<consultationDocument>){
        return this.Repo.updateData(id, data);
    }
    async cancelData(id: string){
        return this.Repo.cancelData(id);
    }
    async markCompleteData(id: string){
        return this.Repo.markCompleteUpdate(id);
    }
    async notesUpdate(id: string, data: Partial<consultationDocument>){
        return this.Repo.notesData(id, data)
    }
}