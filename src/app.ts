import cookieParser from "cookie-parser";
import { Application, Request, Response } from "express";
import express from "express"
import cors from "cors"
import config from "./config";

const app : Application =  express();


app.use(cors({
    origin : config.app_url,
    credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser())



app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success : true,
        message : "Welcome to FixItNow Server . pleas visit server provied and review ",
        builder : "Siam Ahamed"
    })
})

export default app;