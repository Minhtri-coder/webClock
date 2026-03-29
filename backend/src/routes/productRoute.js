import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProductCategory,
  productDetails,
  updateProduct,
} from "../controllers/productController.js";
import { isAuth } from "../middelware/authMiddleware.js";
import { updateStatus } from "../controllers/orderController.js";

const router = express.Router();

router.get("/", getProduct);

router.get("/category", getProductCategory);

router.post("/", isAuth, addProduct);

router.get("/:id", productDetails);

router.put("/:id", isAuth, updateProduct);

router.put("/:id", isAuth, updateStatus);

router.delete("/:id", deleteProduct);

export default router;
