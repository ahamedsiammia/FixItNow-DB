import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { IUser } from "./user.interface";

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

export const authService = {
    createUserIntoDB
}