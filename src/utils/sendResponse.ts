import { Response } from "express"
import { responseInterface } from "./interface"

export const sendResponse =(res:Response,{success,statusCode,message,data,error}:responseInterface)=>{
    res.status(statusCode).json({
        success: success,
        message : message,
        data :data,
        error : error
    })
    
}


