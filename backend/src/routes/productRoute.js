import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductCategory,
  productDetails,
  updateProduct,
} from "../controllers/productController.js";
import { isAuth, isAdmin } from "../middelware/authMiddleware.js";

const router = express.Router();

router.get("/", getProduct);

router.get("/category", getProductCategory);

router.post("/", isAuth, isAdmin, addProduct);

router.get("/:id", productDetails);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
