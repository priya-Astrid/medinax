import { counter } from "../models/counter.model";


export const genetateInvoiceNo = async()=>{
    const year = new Date().getFullYear();
    const Counter = await counter.findOneAndUpdate(
        {key:`invoice-${year}`},
        {$inc: {seq:1}},
        {new: true, upsert: true}
    );
    return `INV-${year}-${String(Counter.seq).padStart(5,'0')}`
}