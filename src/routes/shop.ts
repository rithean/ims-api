import { createShop, getShops, getSinlgeShop } from "@/controllers/shop";
import { getAttendants } from "@/controllers/user";
import express from "express";

const router = express.Router();

router.post("/shops", createShop);

router.get("/shops", getShops);
router.get("/shops/:id", getSinlgeShop);
router.get("/shops/attendants/:shopId", getAttendants);

export default router;
