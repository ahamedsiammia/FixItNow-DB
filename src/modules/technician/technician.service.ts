import { prisma } from "../../lib/prisma";
import { TechnicianI, UpdateTechnicianI } from "./technician.interface";

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

const updateTechnicianProfile = async(payload:UpdateTechnicianI,userId : string)=>{

    const isExistProfile = await prisma.technicianProfiles.findUnique({
        where : {
             userId
        }
    });

    if(!isExistProfile){
        throw new Error("Your Profile Not Exist.Please Create Your Profile")
    };

    const updateProfile = await prisma.technicianProfiles.update({
        where : {
             userId
        },
        data : {
            ...payload
        }
    });

    return {
        updateProfile
    }

};


export const technicianService = {
    createTechnicianProfile,
    updateTechnicianProfile
}