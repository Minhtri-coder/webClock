import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderItems: [
      {
        name: { type: String, required: true },
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
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      country: { type: String, required: true },
      address: { type: String, required: true },
      postcode: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      emailAddress: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["paypal", "bank", "cod"],
    },

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
