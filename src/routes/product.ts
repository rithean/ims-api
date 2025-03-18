import { createProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from "@/controllers/products";
import express from "express";

const router = express.Router();

router.post("/products", createProduct);

router.get("/products", getProducts);
router.get("/products/:id", getSingleProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;