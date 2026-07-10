import { userStatus } from "../../../generated/prisma/enums"

export interface ICategory {
    name : string
    description ?: string
    icons ?: string
}

export interface IUpdateUserStatus {
    status : userStatus
}