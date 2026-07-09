import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { reviewsController } from "./reviews.controller";

const router = Router();

router.post("/",auth(userRole.ADMIN,userRole.TECHNICIAN,userRole.USER),reviewsController.createReviews)

export const reviewsRouter = router