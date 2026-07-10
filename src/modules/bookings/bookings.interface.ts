import { userRole } from "../../../generated/prisma/enums"

export interface IBooking {
    technicianId : string
    serviceId : string
    scheduledDate : Date
    notes : string
}

export interface authI {
      id: string,
      name: string,
      email: string,
      role:  userRole,
}