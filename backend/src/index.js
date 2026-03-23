import express from "express";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/useRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import orderRoute from "./routes/orderRoute.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
connectDB();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
  console.log(`server bắt đầu trên cổng 3000`);
});
