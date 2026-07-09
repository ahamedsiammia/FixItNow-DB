import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { categoriesController } from "./category.controller";

const router = Router();

router.post("/categories",auth(userRole.ADMIN),categoriesController.createCategory);

router.get("/categories",auth(userRole.ADMIN),categoriesController.getAllCategories);

router.get("/users",auth(userRole.ADMIN),categoriesController.getAllUser);

router.patch("/users/:id",auth(userRole.ADMIN),categoriesController.updateUserStatus);

export const AdminRoute = router;