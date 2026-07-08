import { Router } from "express";
import { authController } from "./user.controller";

const router = Router();


router.post("/register",authController.createUser)

export const authRouter = router;