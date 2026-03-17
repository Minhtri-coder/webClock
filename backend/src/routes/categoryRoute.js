import express from "express";
import {
  getCategory,
  postCategory,
} from "../controllers/categorycontroller.js";

const route = express.Router();

route.get("/", getCategory);
route.post("/", postCategory);

export default route;
