import { Request, Response } from "express";
import { authService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus from "http-status";
import { IUser } from "./user.interface";

const createUser =async(req:Request,res:Response)=>{
    try {

    const payload  = req.body;

    const result = await authService.createUserIntoDB(payload as IUser);
    
    sendResponse(res,{
        success: true,
        successCode : HttpStatus.CREATED,
        message : "User Create Successfully",
        data : {
            result
        },
    })
    
    } catch (error : any) {
        sendResponse(res,{
            success : false,
            successCode : HttpStatus.INTERNAL_SERVER_ERROR,
            message : error.message,
            data : [],
            error : {error}
        })
    }
};


export const authController ={
    createUser
}