import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { bookingsController } from "./bookings.controller";

const router = Router();

router.post("/",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),bookingsController.createBooking);

router.get("/",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),bookingsController.getBookingsWithUsers);

router.get("/:id",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),bookingsController.getBookingDetails)

export const bookingsRouter = router;