import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { adminController } from "./admin.controller";

const router = Router();

router.post("/categories",auth(userRole.ADMIN),adminController.createCategory);

router.get("/categories",auth(userRole.ADMIN),adminController.getAllCategories);

router.get("/users",auth(userRole.ADMIN),adminController.getAllUser);

router.patch("/users/:id",auth(userRole.ADMIN),adminController.updateUserStatus);

export const AdminRoute = router;