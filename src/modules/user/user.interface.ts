import { userRole, userStatus } from "../../../generated/prisma/enums"

export interface IUser {
    name : string
    email : string
    password : string
    phone : string
    role ?: userRole
    address : string
    status ?: userStatus
    profileImage ?: string
}