import { APIResponse } from '../dtos/common/response.dto';
import { InvoiceService } from '../services/invoice.service';
import { asyncHandler } from '../utils/asyncHandler';
import { Request, Response } from 'express';
const service = new InvoiceService();
export class InvoiceControler {
  createInvoice = asyncHandler(async (req: Request, res: Response) => {
    const createData = await service.createInvoice(req.body);
    const result: APIResponse<typeof createData> = {
      success: true,
      message: 'Invoice created successfully',
      data: createData
    };
    res.status(201).json(result);
  });
  getInvoice = asyncHandler(async(req:Request, res: Response)=>{
    const getData = await service.getAllInvoice();
    const result: APIResponse<typeof getData>={
        success: true, 
        message: 'fetched Data successfully',
        data: getData
    }
    res.status(200).json(result);
  })
  getSingleInvoice  = asyncHandler(async(req: Request, res: Response)=>{
    const getSingleData = await service.singleInvoiceData(req.params.id);
    const result : APIResponse<typeof getSingleData>={
      success: true,
      message:"fetched Single data successfully",
      data:getSingleData
    }
    res.status(200).json(result);
  })
  updateInvoiceStatus = asyncHandler(async(req:Request, res: Response)=>{
    const updateData = await service.updateStatus(req.params.id, req.body.status);
    const result :APIResponse<typeof updateData>={
        success: true, 
        message:"update Status successfully",
        data: updateData
    }
    res.status(200).json(result);
  })
  isSoftDeleted = asyncHandler(async(req:Request, res: Response)=>{
    const isSoftDelete = await service.isSoftDeleted(req.params.id);
    const result: APIResponse<typeof isSoftDelete>={
        success: true,
        message: "Deleted Data successfully",
        data: isSoftDelete
    }
    res.status(200).json(result);
  })
  restoreInvoice = asyncHandler(async(req: Request, res:Response)=>{
    const restoreData = await service.restoreData(req.params.id);
    const result :APIResponse<typeof restoreData>={
      success: true,
      message:"restore data successfully",
      data: restoreData
    }
    res.status(200).json(result);
  })
}
