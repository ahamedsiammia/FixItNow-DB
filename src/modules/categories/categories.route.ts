import { Router } from "express";
import { categoriesController } from "./categories.controller";

const router = Router();

// public route
router.get("/",categoriesController.getAllServicesCategories)


export const categoriesRoute = router;