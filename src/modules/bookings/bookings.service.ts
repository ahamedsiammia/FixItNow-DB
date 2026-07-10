import { prisma } from "../../lib/prisma";
import { IBooking } from "./bookings.interface";

const createBookingIntoDB = async(payload:IBooking,customerId : string)=>{
    const {notes,scheduledDate,serviceId,technicianId}= payload;

    const isExistTechnician = await prisma.technicianProfiles.findUnique({
        where : {
            id : technicianId
        }
    });

    if(!isExistTechnician){
        throw new Error("This Technician is not exist.")
    };

    const isExistService = await prisma.services.findUnique({
        where:{
            id : serviceId
        }
    });

    if(!isExistService){
        throw new Error("This service is not exist")
    };

    if(isExistService.technicianId !== technicianId){
        throw new Error("This Technician is not provide this service")
    };

    const totalAmount = isExistService.price;

    const booking = await prisma.bookings.create({
        data :{
            customerId,
            totalAmount,
            ...payload
        }
    });

    return {booking}
};


export const bookingsService ={
    createBookingIntoDB
}