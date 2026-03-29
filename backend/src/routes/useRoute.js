import express from "express";
import {
  getUser,
  postLogin,
  postRegister,
} from "../controllers/userControllers.js";


const route = express.Router();

route.post("/login", postLogin);
route.get("/", getUser);
route.post("/register", postRegister);

export default route;
