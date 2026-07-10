import { Bookings, User } from "../../../generated/prisma/client"
import axios from "axios"
import config from "../../config";

const initiatePayment =async(booking :Bookings,user : User)=>{

    const tranId = `TRAN_ID_S_${Date.now()}`

    console.log("store id",config.ssl_comarz_store_id)

    const paymentData = {
"store_id":config.ssl_comarz_store_id,
"store_passwd":config.ssl_comarz_store_password,
"total_amount":booking.totalAmount,
"currency":"BDT",
"tran_id":tranId,
"success_url":"http://yoursite.com/success.php",
"fail_url":"http://yoursite.com/fail.php",
"cancel_url":"http://yoursite.com/cancel.php",
"cus_name":user.name,
"cus_email":user.email,
"cus_add1":user.address,
"cus_add2":user.address,
"cus_city":user.address,
"cus_state":user.address,
"cus_postcode":1000,
"cus_country":"Bangladesh",
"cus_phone":user.phone,
"cus_fax":"01711111111"
    };

     console.log("FINAL DATA BEING SENT:", paymentData)

    const response = await axios.post("https://sandbox.sslcommerz.com/gwprocess/v4/api.php",paymentData,{
        headers : {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })

    const data = await response.data;

    console.log(data);

    return data 
};


export default initiatePayment