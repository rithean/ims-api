import { createSupplier, getSingleSupplier, getSupplier } from "@/controllers/supplier";
import express from "express";

const router = express.Router();

router.post("/suppliers", createSupplier);

router.get("/suppliers", getSupplier);
router.get("/suppliers/:id", getSingleSupplier);

export default router;