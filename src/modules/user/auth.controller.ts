import { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus from "http-status";
import { IUser } from "./auth.interface";

const createUser =async(req:Request,res:Response)=>{
    try {

    const payload  = req.body;

    const result = await authService.createUserIntoDB(payload as IUser);
    
    sendResponse(res,{
        success: true,
        statusCode : HttpStatus.CREATED,
        message : "User Create Successfully",
        data : {
            result
        },
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


const loginUser = async(req:Request,res:Response)=>{
    try {

        const payload = req.body;

        const result = await authService.loginUserIntoDB(payload)
        
        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Your login successfully",
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
}


export const authController ={
    createUser,
    loginUser
}