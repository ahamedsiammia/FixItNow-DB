import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { categoriesService } from "./categories.services";

const getAllServicesCategories =async(req:Request,res:Response)=>{
    try {

        const  servicesCategories = await categoriesService.getAllServicesCategoriesIntoDB()

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "Services retrived successfully",
            data : servicesCategories
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



export const categoriesController ={
    getAllServicesCategories
}