import React, { useContext, useState } from "react";
import { Cartcontext } from "../pages/Cartcontext";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";

function BodyCheckout() {
  const { cartItem, subtotal, setCartItems } = useContext(Cartcontext);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    postcode: "",
    city: "",
    phone: "",
    emailAddress: "",
  });

  const fretch = async () => {
    try {
      const orderItems = cartItem.map((item) => ({
        product: item._id,
        name: item.name,
        qty: item.qty || item.quantity || 1,
        price: item.price,
      }));
      const data = {
        orderItems,
        shippingAddress: {
          firstName: shippingAddress.firstName,
          lastName: shippingAddress.lastName,
          country: shippingAddress.country,
          address: shippingAddress.address,
          postcode: shippingAddress.postcode,
          city: shippingAddress.city,
          phone: shippingAddress.phone,
          emailAddress: shippingAddress.emailAddress,
        },
        totalPrice: subtotal,
        paymentMethod,
      };
      const res = await api.post("/order", data);
      setCartItems([]);
      localStorage.removeItem("cart");
      console.log("mua sản phẩm thành công", res.data);
      navigate("/success", {
        state: res.data.order,
      });
    } catch (error) {
      console.log("bị lỗi", error.response?.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-16 py-12 font-sans">
      {/* STEP NAVIGATION - Làm chữ to và thoáng hơn */}
      <div className="text-center uppercase tracking-[0.2em] text-[16px] mb-16 flex justify-center items-center gap-2">
        <button
          onClick={() => navigate("/cart")}
          className="font-medium text-black"
        >
          Shopping Cart
        </button>
        <span className="text-gray-300 mx-2">&gt;</span>
        <button className="text-gray-300">Checkout details</button>
        <span className="text-gray-300 mx-2">&gt;</span>
        <button className="text-gray-300">Order complete</button>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 p-24">
        {/* BÊN TRÁI: BILLING DETAILS */}
        <div className="flex-[1.5]">
          <h2 className="text-[18px] font-bold tracking-widest mb-6 uppercase">
            Billing details
          </h2>

          <form className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label className="block mb-2 font-medium">First name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={shippingAddress.firstName}
                className="w-full border border-gray-300 p-2 outline-none focus:border-black transition"
              />
            </div>
            <div className="col-span-1">
              <label className="block mb-2 font-medium">Last name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={shippingAddress.lastName}
                className="w-full border border-gray-300 p-2 outline-none focus:border-black transition"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Country / Region</label>
              <select
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className={`w-full border p-2 ${
                  errors.country ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select a country / region...</option>
                <option value="Vietnam">Vietnam</option>
                <option value="USA">USA</option>
              </select>

              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block mb-2 font-medium">Street address</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={shippingAddress.address}
                placeholder="House number and street name"
                className="w-full border border-gray-300 p-2 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">
                Postcode / ZIP (optional)
              </label>
              <input
                type="text"
                name="postcode"
                onChange={handleChange}
                value={shippingAddress.postcode}
                className="w-full border border-gray-300 p-2 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Town / City</label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={shippingAddress.city}
                className="w-full border border-gray-300 p-2 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={shippingAddress.phone}
                className="w-full border border-gray-300 p-2 outline-none"
              />
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Email address</label>
              <input
                type="email"
                name="emailAddress"
                onChange={handleChange}
                value={shippingAddress.emailAddress}
                className="w-full border border-gray-300 p-2 outline-none"
              />
            </div>
          </form>
        </div>

        {/* BÊN PHẢI: YOUR ORDER (KHUNG ĐEN) */}
        <div className="flex-1">
          <div className="border-[2px] border-black p-8">
            <h2 className="text-[18px] font-bold tracking-widest mb-6 uppercase">
              Your order
            </h2>

            <div className="flex justify-between font-bold border-b pb-2 mb-4 tracking-widest text-[11px]">
              <span>PRODUCT</span>
              <span>SUBTOTAL</span>
            </div>

            {/* List sản phẩm tóm tắt */}
            {cartItem.map((item) => (
              <div
                key={item._id}
                className="flex justify-between mb-4 text-gray-500 italic"
              >
                <span className="uppercase">
                  {item.name} ref {item._id?.slice(-5)} × {item.qty}
                </span>
                <span className="text-black font-medium">
                  {item.price.toLocaleString()} $
                </span>
              </div>
            ))}

            <div className="flex justify-between border-t pt-4 font-bold">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()} $</span>
            </div>
            <div className="flex justify-between border-b pb-4 mb-6 font-bold text-[15px]">
              <span>Total</span>
              <span>{subtotal.toLocaleString()} $</span>
            </div>

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <div className="space-y-4 text-[12px]">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  id="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="mt-1"
                />
                <label htmlFor="paypal" className="font-bold cursor-pointer">
                  PayPal Goods and Services
                </label>
              </div>

              {paymentMethod === "paypal" && (
                <div className="text-gray-600 leading-relaxed ml-6 italic">
                  Our PayPal details will appear after you fill in your shipping
                  information...
                  <p className="mt-2">
                    Once you have made the payment, please let us know via Email
                    or WhatsApp
                  </p>
                </div>
              )}

              <div className="flex items-start gap-3 border-t pt-4">
                <input
                  type="radio"
                  name="payment"
                  id="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="mt-1"
                />
                <label htmlFor="bank" className="font-bold cursor-pointer">
                  Bank Transfer - Discount 5%
                </label>
              </div>

              <div className="flex items-start gap-3 mt-8">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="cursor-pointer">
                  I have read and agree to the website{" "}
                  <b>terms and conditions</b>
                </label>
              </div>

              <button
                className="w-full bg-black text-white py-4 mt-4 uppercase tracking-[0.2em] font-bold hover:bg-gray-800 transition"
                onClick={fretch}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BodyCheckout;
