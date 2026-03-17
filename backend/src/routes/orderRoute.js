import express from "express";
import { addOrder, getOrder } from "../controllers/orderController.js";
import { isAuth, isAdmin } from "../middelware/authMiddleware.js";

const route = express.Router();

route.get("/", getOrder);
route.post("/", isAuth, addOrder);

export default route;
