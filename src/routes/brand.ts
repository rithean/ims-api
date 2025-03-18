import { createBrand, deleteBrand, getBrands, getSingleBrand, updateBrand } from "@/controllers/brand";
import express from "express";

const router = express.Router();

router.post("/brands", createBrand);

router.get("/brands", getBrands);
router.get("/brands/:id", getSingleBrand);

router.put("/brands/:id", updateBrand);

router.delete("/brands/:id", deleteBrand);

export default router;