import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUser, LIuser } from "./auth.interface";
import  Jwt, { SignOptions }  from "jsonwebtoken";
import config from "../../config";
import { userRole } from "../../../generated/prisma/enums";
import { createToken } from "../../utils/token/jwtToken";



const createUserIntoDB = async(payload : IUser)=>{

    const {name,email,password,address,phone,profileImage}= payload;

    console.log(payload);

    const isUserExit = await prisma.user.findUnique({
        where:{email}
    });
    
    if(isUserExit){
        throw new Error("User with this email already exits!")
    };
    
    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await prisma.user.create({
        data : {
            name,
            email,
            password : hashedPassword,
            address,
            phone,
            profileImage
        },
        omit : {
            password : true
        }
    })

    return user
    
};


const loginUserIntoDB = async(payload:LIuser)=>{
    const {email,password} = payload;


    const isExistUser = await prisma.user.findUnique({
        where :{
            email
        }
    });

    if(!isExistUser){
        throw new Error(`this email is not exist.please ${email} register now`)
    }

    const hashedPassword = isExistUser.password as string;


    const passwordCompare = await bcrypt.compare(password,hashedPassword);

    if(!passwordCompare){
        throw new Error(`Your Password is invalid.please provid valid password`)
    }

    const jwtPayload = {
        id : isExistUser.id,
        name : isExistUser.name ,
        email : isExistUser.email,
        role : isExistUser.role
    }



    const accessToken = await createToken(jwtPayload,config.jwt_access_secret,config.jwt_access_expires_in);


    const refreshToken = await createToken(jwtPayload,config.jwt_refresh_secret,config.jwt_refresh_expires_in);

    const {id,name,email : userEmail,address,phone,role,status,profileImage,createdAt,updatedAt} = isExistUser;
    
    const accesstoken = accessToken.data
    const refreshtoken = refreshToken.data

    return {
        id,
        name,
        userEmail,
        address,
        phone,
        role,
        status,
        profileImage,
        createdAt,
        updatedAt,
        accesstoken,
        refreshtoken
    }


};

export const authService = {
    createUserIntoDB,
    loginUserIntoDB,
}