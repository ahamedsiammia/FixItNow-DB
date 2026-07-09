import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus from "http-status";
import { technicianService } from "./technician.service";

const createTechnician =async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
console.log(payload);
        const userId = req.user?.id

        if(!userId){
            sendResponse(res,{
            success: false,
            statusCode:HttpStatus.UNAUTHORIZED,
            message : " Your not Logged In . Please Logged in to access to this Resource.",
            data : []
        })    
        }

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

const updateTechnicianProfile =async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
        const userId = req.user?.id as string
        const updateUser = await technicianService.updateTechnicianProfile(payload,userId);
        
        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.UPGRADE_REQUIRED,
            message :"Your profile Update successfully",
            data : updateUser
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
    createTechnician,
    updateTechnicianProfile
}