import { prisma } from "../../lib/prisma";
import { TechnicianI } from "./technician.interface";

const createTechnicianProfile =async(payload:TechnicianI,userId:string)=>{

    const isExistUser = await prisma.technicianProfiles.findUnique({
        where:{
            userId
        }
    });

    if(isExistUser){
        throw new Error("Your Profile already Created.")
    }

    const {availabilitySlots,experienceYear,hourlyRate,rating,skills,totalReviews, bio}=payload



    const user = await prisma.technicianProfiles.create({
        data:{
          userId,
          availabilitySlots,
          experienceYear,
          hourlyRate,
          rating,
          skills,
          totalReviews,
          bio
          
        }
    })

    return {
        user
    }
};


export const technicianService = {
    createTechnicianProfile
}