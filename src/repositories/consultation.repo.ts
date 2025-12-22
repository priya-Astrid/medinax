import { consultation, consultationDocument } from "../models/consultation.model";
import { buildQuery } from "../utils/buildQuery";

export class consultationRepository{
    async createConsultation(data: Partial<consultationDocument>){
        return consultation.create(data)
    }
    async getAllData(query:any){
        const {filter, options} = buildQuery(query);

        const data = await consultation.find(filter, null, options).lean();
        
        const total = await consultation.countDocuments(filter);

        return{
            data,
            total,
            page:Math.ceil(options.skip/options.limit)+1,
            totalPage: Math.ceil(total/options.limit)        }
    }
    async updateData(id:string, Data:Partial<consultationDocument>){
        return consultation.findByIdAndUpdate(id, Data, {new: true})
    }
    async cancelData(id: string){
        return consultation.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
    }
    async singledata(id: string){
        return consultation.findById(id).populate('patientId doctorId appointmentId').lean();
    }
    async markCompleteUpdate(id: string){
        return consultation.findByIdAndUpdate(
            id,
            {status:'COMPLETED'},
            {new : true}
        );
    }
    async notesData(id: string, data: Partial<consultationDocument>){
        return consultation.findByIdAndUpdate(id, data,{new: true});
    }
}