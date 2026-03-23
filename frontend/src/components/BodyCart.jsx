import React, { useContext, useEffect } from "react";
import { Cartcontext } from "../pages/Cartcontext";
import { useNavigate } from "react-router-dom";

function BodyCart() {
  const {
    cartItem = [],
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(Cartcontext);
  const navigate = useNavigate();

  // Đảm bảo luôn cuộn lên đầu trang khi vào giỏ hàng
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subtotal = cartItem.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="bg-white min-h-screen px-4 md:px-16 py-12 font-sans">
      {/* STEP NAVIGATION - Làm chữ to và thoáng hơn */}
      <div className="text-center uppercase tracking-[0.2em] text-[16px] mb-16 flex justify-center items-center gap-2">
        <span className="font-medium text-black">Shopping Cart</span>
        <span className="text-gray-300 mx-2">&gt;</span>
        <span className="text-gray-300">Checkout details</span>
        <span className="text-gray-300 mx-2">&gt;</span>
        <span className="text-gray-300">Order complete</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* LEFT SIDE - TABLE */}
        <div className="flex-[2.5]">
          {/* HEADER TABLE */}
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr] text-[11px] tracking-[0.15em] text-black font-bold border-b pb-3 mb-2 uppercase">
            <span>Product</span>
            <span className="text-center">Price</span>
            <span className="text-center">Quantity</span>
            <span className="text-right">Subtotal</span>
          </div>

          {/* LIST ITEMS */}
          {cartItem.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[3fr_1fr_1fr_1fr] items-center border-b py-6 group"
            >
              {/* Info Product */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="w-6 h-6 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-black hover:border-black transition text-[10px]"
                >
                  ✕
                </button>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover"
                />
                <div className="max-w-[200px]">
                  <p className="uppercase text-[12px] tracking-[0.1em] leading-relaxed font-medium">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-1 italic">
                    ref {item._id?.slice(-4)}
                  </p>
                </div>
              </div>

              {/* Price */}
              <p className="text-[13px] text-center font-medium italic">
                {item.price.toLocaleString()} $
              </p>

              {/* Quantity Selector */}
              <div className="flex justify-center">
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => decreaseQty(item._id)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 text-[12px] border-x border-gray-200">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increaseQty(item._id)}
                    className="px-2 py-1 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal Item */}
              <p className="text-[13px] text-right font-medium italic">
                {(item.price * item.quantity).toLocaleString()} $
              </p>
            </div>
          ))}

          {/* BUTTON CONTINUE */}
          <button
            onClick={() => navigate("/")}
            className="mt-8 border border-black px-6 py-2 text-[11px] font-bold tracking-[0.2em] hover:bg-black hover:text-white transition duration-300"
          >
            ← CONTINUE SHOPPING
          </button>
        </div>

        {/* RIGHT SIDE - CART TOTALS */}
        <div className="flex-1">
          <div className="border border-gray-100 p-6 bg-white shadow-sm">
            <h3 className="text-[13px] font-bold tracking-[0.2em] border-b pb-4 mb-4 uppercase">
              Cart Totals
            </h3>

            <div className="flex justify-between items-center py-3 border-b border-gray-50 text-[13px]">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">{subtotal.toLocaleString()} $</span>
            </div>

            <div className="flex justify-between items-center py-4 mb-6 text-[14px]">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="font-bold text-lg">
                {subtotal.toLocaleString()} $
              </span>
            </div>

            <button
              className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-[0.2em] hover:bg-gray-800 transition duration-300 uppercase"
              onClick={() => navigate("/checkout")}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyCart;
