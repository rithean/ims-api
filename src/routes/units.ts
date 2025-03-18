import { createUnit, deleteUnit, getSingleUnit, getUnits, updateUnit } from "@/controllers/units";
import express from "express";

const router = express.Router();

router.post("/units", createUnit);

router.get("/units", getUnits);
router.get("/units/:id", getSingleUnit);

router.put("/units/:id", updateUnit);

router.delete("/units/:id", deleteUnit);

export default router;