import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    details: {
      movement: { type: String },
      caseSize: { type: String },
      material: { type: String },
      year: { type: String },
      strap: { type: String },
    },
    description: { type: String, required: true },
    countInStock: { type: Number, default: 1 },
    isSold: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);
const product = mongoose.model("products", productSchema);
export default product;
