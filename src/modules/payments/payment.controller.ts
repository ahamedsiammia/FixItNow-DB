import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { paymentService } from "./payment.service";

const createPayment =async(req:Request,res:Response)=>{
    try {

        const bookingId = req.params?.id as string;
        const userId = req.user?.id as string;

        const payment = await paymentService.createPayment(bookingId,userId)

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Payment checkout retrived successfully",
            data : payment
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


export const paymentController ={
    createPayment
}