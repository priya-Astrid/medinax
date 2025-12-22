import { Invoice, invoiceDocument } from "../models/invoice.model";

export class InvoiceRepository{
    async createInvoice(data: Partial<invoiceDocument>){
        return Invoice.create(data);
    }
    async getInvoiceData(){
        return Invoice.find({ isDeleted: false });
    }
    async getSingleInvoice(id: string){
        return Invoice.findOne({ _id: id, isDeleted: false });
    }
    async updateStatus(id: string, status: 'pending' |'paid'| 'cancelled'|'partial'){
        return Invoice.findByIdAndUpdate(id, {status}, {new: true});
    }
    async isSoftDelete(id:string){
        return Invoice.findByIdAndUpdate(id,{isDeleted: true}, {new:true});
    }
    async restoreInvoice(id:string){
        return Invoice.findByIdAndUpdate(id,{isDeleted: false},{new: true})
    }
}