import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus from "http-status";
import { technicianService } from "./technician.service";

const createTechnician =async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
console.log(payload);
        const userId = req.user?.id

        const result = await technicianService.createTechnicianProfile(payload,userId as string);

        sendResponse(res,{
            success: true,
            statusCode:HttpStatus.CREATED,
            message : "Technician Profile Create Successfully.",
            data : result
        })
        
    } catch (error : any) {
        sendResponse(res,{
            success : false,
            statusCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message : error.message,
            data : [],
            error : {error}
        })
    }
};


export const technicianController = {
    createTechnician
}