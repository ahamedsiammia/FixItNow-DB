import cookieParser from "cookie-parser";
import { Application, Request, Response } from "express";
import express from "express"
import cors from "cors"
import config from "./config";
import { authRouter } from "./modules/user/auth.route";
import { technicianRouter } from "./modules/technician/technician.route";
import { reviewsRouter } from "./modules/reviews/reviews.route";
import { categoryRoute } from "./modules/categories/category.route";

const app : Application =  express();


app.use(cors({
    origin : config.app_url,
    credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())



app.use("/api/auth",authRouter)

app.use("/api/technician",technicianRouter)

app.use("/api/reviews",reviewsRouter)

app.use("/api/admin",categoryRoute)



app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success : true,
        message : "Welcome to FixItNow Server . pleas visit server provied and review ",
        builder : "Siam Ahamed"
    })
})

export default app;