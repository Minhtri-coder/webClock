import express from "express";
import {
  addOrder,
  getOrder,
  getSumOrder,
} from "../controllers/orderController.js";
import { isAuth } from "../middelware/authMiddleware.js";

const route = express.Router();

route.get("/", getOrder);
route.post("/", addOrder);
route.get("/sumOrder", getSumOrder);

export default route;
