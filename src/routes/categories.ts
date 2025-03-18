import { createCategory, deleteCategory, getCategories, getSingleCategory, updateCategory } from "@/controllers/categories";
import express from "express";

const router = express.Router();

router.post("/categories", createCategory);

router.get("/categories", getCategories);
router.get("/categories/:id", getSingleCategory);

router.put("/categories/:id", updateCategory);

router.delete("/categories/:id", deleteCategory);

export default router;