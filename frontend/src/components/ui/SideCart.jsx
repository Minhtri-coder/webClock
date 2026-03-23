// SideCart.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Cartcontext } from "../../pages/Cartcontext";

export default function SideCart({ isOpen, setIsOpen }) {
  const { cartItem, subtotal, removeFromCart } = useContext(Cartcontext);
  const navigate = useNavigate();
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[350px] bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 flex flex-col h-full  text-black ">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Cart
            </h2>
            <button onClick={() => setIsOpen(false)} className="text-2xl">
              &times;
            </button>
          </div>

          {/* List cart items */}
          <div className="flex-1 overflow-y-auto py-4">
            {cartItem.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty</p>
            ) : (
              cartItem.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center border-b py-4"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover bg-gray-100"
                    />

                    <div className="flex flex-col">
                      {/* NAME */}
                      <p className="text-sm font-semibold tracking-wide uppercase">
                        {item.name}
                      </p>

                      {/* REF (nếu có) */}
                      <p className="text-sm text-gray-600">
                        ref {item._id?.slice(-5)}
                      </p>

                      {/* PRICE */}
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} × ${item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="w-8 h-8 flex items-center justify-center border rounded-full text-gray-500 hover:text-black hover:border-black transition"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between font-bold">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(0)}</span>
            </div>
            <button
              className="w-full bg-black text-white py-3 uppercase text-sm tracking-widest hover:bg-gray-800"
              onClick={() => {
                navigate("/cart");
                window.scrollTo(0, 0);
                setIsOpen(false);
              }}
            >
              View Cart
            </button>
            <button className="w-full bg-black text-white py-3 uppercase text-sm tracking-widest hover:bg-gray-800">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
