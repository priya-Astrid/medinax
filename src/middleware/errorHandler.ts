import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
 
export const errorHandler = (
     err : any,
    req: Request,
    res: Response,
    next : NextFunction
) =>{
    if(res.headersSent){
        return next(err);
    }
    console.log('error caught' , err);
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    if(err.name === "ValidationError"){
        return res.status(400).json({
            success:false,
            message: err.message,
        });
    }
    // Zod validation error
    if(err.error && Array.isArray(err.errors)){
        return res.status(400).json({
            success: false,
            message: "validation failed",
            error: err.errors,
        })
    }
    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}