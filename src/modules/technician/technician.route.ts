import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { technicianController } from "./technician.controller";

const router = Router();

router.post("/create-profile",auth(userRole.TECHNICIAN),technicianController.createTechnician)

export const technicianRouter = router;