import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { paymentController } from "./payment.controller";

const router = Router();

router.post("/:id",auth(userRole.ADMIN,userRole.USER,userRole.TECHNICIAN),paymentController.createPayment)


export const paymentRouter = router