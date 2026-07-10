import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { bookingsService } from "./bookings.service";

const createBooking = async(req:Request,res:Response)=>{
    try {

        const payload = req.body;
        const customerId = req.user?.id as string;

        const booking = await bookingsService.createBookingIntoDB(payload,customerId);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.CREATED,
            message :"your booking create successfully",
            data : booking
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


export const bookingsController = {
    createBooking
}