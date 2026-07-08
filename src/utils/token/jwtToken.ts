import  Jwt, { SignOptions }  from "jsonwebtoken"
import { IjwtPayload } from "../interface"

export const createToken =async(payload:IjwtPayload,secret : string, expireIn : SignOptions )=>{
    try {
             if(!secret && secret === undefined){
            throw new Error("Please Provied Secret")
        }
    const token = await Jwt.sign(payload,secret,{
        expiresIn : expireIn as SignOptions["expiresIn"] 
    })

    return {
        success:true,
        data : token
    }
    } catch (error : any) {
          return {
        success:false,
        error : error.message
      
    }
}
}

export const varifyToken = async(token:string,secret:string)=>{
    try {
        const varifyedToken = await Jwt.verify(token,secret)

        return {
            success:true,
            data : varifyedToken as IjwtPayload
        }
    } catch (error : any) {
        return {
            success : false,
            message : error.message
        }
    }
}



