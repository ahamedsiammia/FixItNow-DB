import { prisma } from "../../lib/prisma";
import { TechnicianI } from "./technician.interface";

const createTechnicianProfile =async(payload:TechnicianI,userId:string)=>{

    const {availabilitySlots,experienceYear,hourlyRate,rating,skills,totalReviews, bio}=payload
    console.log(payload,"this is technician payload");
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