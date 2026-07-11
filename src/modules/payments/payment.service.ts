import axios from "axios";
import { User } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma"
import initiatePayment from "./payment.checkout";
import config from "../../config";

const createPayment =async(bookingId:string,userId :string)=>{
    const bookingInfo  = await prisma.bookings.findUnique({
        where : {
            id : bookingId
        },
        include :{
            customer : true,
            
        }
        
    })

    
    if(!bookingInfo){
        throw new Error("Your Not booking")
    }
    
    const bookingUserId = bookingInfo?.customer.id;

    if(userId !== bookingUserId){
        throw new Error("You Don't Owner is booking")
    };

    // validation 

    if(bookingInfo.stats !== "ACCEPTED"){
        throw new Error("Cannot proceed with payment because the booking is not accepted.");
    }

    const user = bookingInfo?.customer as User;
    
    const { customer, ...bookingData } = bookingInfo!;
    
    console.log("this is booking info",bookingInfo);
    const checkout = await initiatePayment(bookingData,user)

    return {checkout}
}


const verifyPayment =async(bookingId : string,tranId: string,status:string,payload:any)=>{

    const valId = payload.val_id;
    const storeId = config.ssl_comarz_store_id;
    const storePassword = config.ssl_comarz_store_password

    const response = await axios.post(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${valId}&store_id=${storeId}&store_passwd=${storePassword}&format=json`,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })

    await prisma.bookings.update({
        where : {
            id : bookingId
        },
        data :{
            stats : "COMPLETED"
        }
    })

    await prisma.payments.update({
        where : {
            bookingId
        },
        data : {
            status : "PAID",
            provider : response.data.card_issuer,
            paidAt : new Date(),
            meta : payload 
        }
    })

    console.log("payment korar por",response);
}

export const paymentService ={
    createPayment,
    verifyPayment
}