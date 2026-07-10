import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { bookingsController } from "./bookings.controller";

const router = Router();

router.post("/",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),bookingsController.createBooking)

export const bookingsRouter = router;