import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        qty: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },

    paymentMethod: { type: String, required: true, default: "COD" },

    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true },
);



const order = mongoose.model("order", orderSchema);
export default order;
