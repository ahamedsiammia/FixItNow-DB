import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { reviewsService } from "./reviews.service";

const createReviews = async(req:Request,res:Response)=>{
    try {
        const payload = req.body;
        const customerId = req.user?.id as string
        const review = await reviewsService.createReviewsIntoDB(payload,customerId)
        
        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.CREATED,
            message : "Your Review Create Successfully",
            data : review
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

export const reviewsController ={
    createReviews
}