import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import initiatePayment from "./payment.checkout";

const createPayment =async(bookingId:string,userId:string)=>{
    const bookingInfo  = await prisma.bookings.findUnique({
        where : {
            id : bookingId
        },
        include :{
            customer : true,
            
        }
        
    })

    const bookingUserId = bookingInfo?.customer.id;

    if(userId !== bookingUserId){
        throw new Error("You Don't Owner is booking")
    };

    const user = bookingInfo?.customer as User;

     const { customer, ...bookingData } = bookingInfo;

    const checkout = await initiatePayment(bookingData,user)

    return {checkout}
}

export const paymentService ={
    createPayment
}