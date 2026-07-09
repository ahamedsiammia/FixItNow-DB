import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRole } from "../../../generated/prisma/enums";
import { categoriesController } from "./category.controller";

const router = Router();

router.post("/categories",auth(userRole.ADMIN),categoriesController.createCategory);

router.get("/categories",auth(userRole.ADMIN),categoriesController.getAllCategories);

export const categoryRoute = router;