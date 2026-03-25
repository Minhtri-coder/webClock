import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BodySuccess() {
  const navigate = useNavigate();
  const { state: order } = useLocation();
  console.log("DATA:", location.state);

  return (
    <div className="min-h-screen bg-[#f3efe8] flex items-center justify-center px-4">
      <div className="bg-white max-w-xl w-full p-10 border border-gray-200 shadow-sm">
        {/* Logo / Brand */}
        <h2 className="text-center text-sm tracking-[0.4em] uppercase mb-6 text-gray-500">
          Vintage Watch
        </h2>

        {/* Icon */}
        <div className="text-center text-3xl mb-4">✔</div>

        {/* Title */}
        <h1 className="text-center text-xl font-semibold tracking-[0.3em] uppercase mb-4">
          Order Confirmed
        </h1>

        {/* Message */}
        <p className="text-center text-gray-600 text-sm leading-relaxed mb-8">
          Your timepiece has been successfully reserved. Our team will carefully
          prepare and ship your order.
        </p>

        {/* Order Summary */}
        <div className="border-t pt-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Total</span>
            <span>{order?.totalPrice?.toLocaleString()} $</span>
          </div>

          <div className="flex justify-between">
            <span>Payment</span>
            <span className="uppercase">{order?.paymentMethod}</span>
          </div>

          <div className="flex justify-between">
            <span>City</span>
            <span>{order?.shippingAddress?.city}</span>
          </div>
        </div>

        {/* Products */}
        <div className="mt-6 border-t pt-4 space-y-2 text-sm">
          {order?.orderItems?.map((item) => (
            <div key={item.product} className="flex justify-between">
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{item.price}$</span>
            </div>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full border border-black py-3 uppercase tracking-[0.2em] hover:bg-black hover:text-white transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default BodySuccess;
