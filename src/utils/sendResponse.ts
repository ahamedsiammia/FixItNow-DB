import { Response } from "express"
import { responseInterface } from "./interface"

export const sendResponse =(res:Response,{success,successCode,message,data,error}:responseInterface)=>{
    res.status(successCode).json({
        success: success,
        message : message,
        data :data,
        error : error
    })
    
}


