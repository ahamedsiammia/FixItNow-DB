import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import  HttpStatus  from "http-status";
import { categoriesService } from "./category.service";
import { ICategory } from "./category.interface";

const createCategory =async(req:Request,res:Response)=>{
    try {

        const payload = req.body as ICategory;

        const category = await categoriesService.createCategoryIntoDB(payload);

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.CREATED,
            message : "Categories Create Successfully",
            data : category
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


const getAllCategories = async(req:Request,res:Response)=>{
    try {

        const categories = await categoriesService.getAllCategories();

        sendResponse(res,{
            success : true,
            statusCode : HttpStatus.OK,
            message : "category retrived successfully",
            data : categories
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

export const categoriesController = {
    createCategory,
    getAllCategories
}