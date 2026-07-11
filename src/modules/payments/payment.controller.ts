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
            data : payment.checkout.GatewayPageURL
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


const verifyPayment =async(req:Request,res:Response)=>{
    try {

        const {bookingId,tranId,status}=req.query;
        const payload = req.body;

        // console.log("form verify payment ",req.body,bookingId,tranId,status);

        const response = await paymentService.verifyPayment(bookingId as string,tranId as string,status as string,payload)
        
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

export const paymentController ={
    createPayment,
    verifyPayment
}