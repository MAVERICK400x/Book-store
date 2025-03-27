import express from "express";
import { getAllProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts); // This now handles search & sorting

export default router;
