import { Request, Response } from "express";
import { authService } from "./auth.service";

const createUser =async(req:Request,res:Response)=>{
    try {

    const payload  = req.body;

    const result = await authService.createUserIntoDB();

    res.status(200).json({
        success: true,
        
    })
    
    } catch (error) {
        
    }
};


export const authController ={
    createUser
}