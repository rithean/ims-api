import { authorizeUser } from "@/controllers/login";
import express from "express";

const router = express.Router();

router.post("/auth/login", authorizeUser);

export default router;