import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { calculatePagination } from "../../utils/pagination";
import { filteringI, IServices, paginationI, TechnicianI, UpdateTechnicianI } from "./technician.interface";

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


// public api function 

const getAllTechnicianIntoDB = async (payload: filteringI,  options: paginationI) => {
  const {
    searchTerm,
    Rating,
    minPrice,
    maxPrice,
    experience,
    availabilitySlots
  } = payload;

 const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const andConditions: Prisma.TechnicianProfilesWhereInput[] = [];

  // General search with skills 
  if (searchTerm) {
    andConditions.push({
        OR:[
            {
                skills : {
                    contains : searchTerm,
                    mode : "insensitive"
                }
            }
        ]
    });
  }

  // Minimum rating filter
  if (Rating) {
    andConditions.push({
      rating: { gte: Number(Rating) },
    });
  }

  // Price range filter
  if (minPrice || maxPrice) {
    andConditions.push({
      hourlyRate: {
        ...(minPrice && { gte: Number(minPrice) }),
        ...(maxPrice && { lte: Number(maxPrice) }),
      },
    });
  }

  // Experience filter
  if (experience) {
    andConditions.push({
      experienceYear: { gte: Number(experience) },
    });
  }

  if(availabilitySlots){
    andConditions.push({
        OR:[
            {
                availabilitySlots : {
                    contains : availabilitySlots,
                    mode : "insensitive"
                }
            }
        ]
    })
  }



  const whereConditions: Prisma.TechnicianProfilesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const technician = await prisma.technicianProfiles.findMany({
    where: whereConditions,
     skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

    const total = await prisma.technicianProfiles.count({
    where: whereConditions,
  });


  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: technician,
  };
};


const getSingleTechnician =async(id:string)=>{
    const technician= await prisma.technicianProfiles.findUnique({
        where:{
            id
        }
    });

    if(!technician){
        throw new Error("this Technician is not exist!")
    };

    const technician_Id = technician.id as string

    const reviews = await prisma.reviews.findMany({
        where : {
            technicianId : technician_Id
        }
    });

    return {
        technician,
        reviews
    }


};


// Service  create api
const createServiceIntoDB = async(payload:IServices,userId:string)=>{
    const {categoryId} = payload;

    const isExistTechnicianProfile = await prisma.technicianProfiles.findUnique({
        where : {
            userId 
        }
    })

    if(!isExistTechnicianProfile){
        throw new Error("This Technician is not create technician profile. ")
    }

    const technician_Id = isExistTechnicianProfile?.id as string;

    const isExistCategory = await prisma.categories.findUnique({
        where : {
            id : categoryId
        }
    });

    if(!isExistCategory){
        throw new Error("This categories is not exist")
    };



    const service = await prisma.services.create({
        data : {
            technicianId :technician_Id ,
            ...payload
        }
    });

    return {service}
};





export const technicianService = {
    createTechnicianProfile,
    updateTechnicianProfile,
    getAllTechnicianIntoDB,
    getSingleTechnician,
    createServiceIntoDB
}