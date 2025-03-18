import { createCustomer, getCustomers, getSingleCustomer } from "@/controllers/customer";
import express from "express";

const router = express.Router();

router.post("/customers", createCustomer);

router.get("/customers", getCustomers);
router.get("/customers/:id", getSingleCustomer);

export default router;