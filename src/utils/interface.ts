import { userRole } from "../../generated/prisma/enums"

export interface responseInterface {
    success : boolean,
    statusCode : number
    message : string
    data : any
    error ?: any

}


 export   interface IjwtPayload {
        id : string
        name : string
        email : string
        role : userRole
}


export interface IOptions {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
};