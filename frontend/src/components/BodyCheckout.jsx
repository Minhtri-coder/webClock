import React, { useContext, useState } from "react";
import { Cartcontext } from "../pages/Cartcontext";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";

function BodyCheckout() {
  const { cartItem, subtotal, setCartItems, totalprice, SHIPPING_FEE } =
    useContext(Cartcontext);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        totalPrice: subtotal + SHIPPING_FEE,
        paymentMethod,
        shippingFee: SHIPPING_FEE,
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

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!shippingAddress.firstName.trim()) {
      newErrors.firstName = "First name is a required field.";
    }
    if (!shippingAddress.lastName.trim()) {
      newErrors.lastName = "Last name is a required field.";
    }
    if (!shippingAddress.country.trim()) {
      newErrors.country = "country is a required field.";
    }
    if (!shippingAddress.address.trim()) {
      newErrors.address = "address is a required field.";
    }
    if (!shippingAddress.postcode.trim()) {
      newErrors.postcode = "postcode is a required field.";
    }
    if (!shippingAddress.city.trim()) {
      newErrors.city = "city is a required field";
    }
    if (!shippingAddress.phone.trim()) {
      newErrors.phone = "phone is a required field";
    }
    if (!shippingAddress.emailAddress.trim()) {
      newErrors.emailAddress = "emailAddress is a required field";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
    fretch();
    console.log("Dữ liệu OK:", shippingAddress);
  };

  return (
    <div className="bg-white min-h-screen px-4 md:px-16 py-12 font-sans ">
      {/* STEP NAVIGATION - Làm chữ to và thoáng hơn */}
      <div className="text-center uppercase tracking-[0.2em] text-[16px]  flex justify-center items-center gap-2">
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
      <div className="flex flex-col lg:flex-row gap-12 p-24 ">
        {/* BÊN TRÁI: BILLING DETAILS */}
        <div className="flex-[1.5] ">
          <h2 className="text-[18px] font-bold tracking-widest mb-6 uppercase">
            Billing details
          </h2>

          <form
            className="grid grid-cols-2 gap-4"
            id="checkoutForm"
            onSubmit={handleSubmit}
          >
            <div className="col-span-1">
              <label className="block mb-2 font-medium">First name</label>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                value={shippingAddress.firstName}
                className={`w-full border border-gray-300 p-2 outline-none focus:border-black transition ${
                  errors.firstName ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="col-span-1">
              <label className="block mb-2 font-medium">Last name</label>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                value={shippingAddress.lastName}
                className={`w-full border border-gray-300 p-2 outline-none focus:border-black transition ${
                  errors.lastName ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1 ">{errors.lastName}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Country / Region</label>
              <select
                name="country"
                value={shippingAddress.country}
                onChange={handleChange}
                className={`w-full border p-2 ${
                  errors.country ? "border-red-500 " : "border-gray-300"
                }`}
              >
                <option value="">Select a country / region...</option>
                <option value="Vietnam">Vietnam</option>
                <option value="USA">USA</option>
              </select>

              {errors.country && (
                <p className="text-red-500 text-xs mt-1 text-sm">
                  {errors.country}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Street address</label>
              <input
                type="text"
                name="address"
                onChange={handleChange}
                value={shippingAddress.address}
                placeholder="House number and street name"
                className={`w-full border border-gray-300 p-2 outline-none ${
                  errors.address ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
              )}
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
                className={`w-full border border-gray-300 p-2 outline-none ${
                  errors.postcode ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.postcode && (
                <p className="text-red-500 text-xs mt-1">{errors.postcode}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Town / City</label>
              <input
                type="text"
                name="city"
                onChange={handleChange}
                value={shippingAddress.city}
                className={`w-full border border-gray-300 p-2 outline-none ${
                  errors.city ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                onChange={handleChange}
                value={shippingAddress.phone}
                className={`w-full border border-gray-300 p-2 outline-none ${
                  errors.phone ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="col-span-2">
              <label className="block mb-2 font-medium">Email address</label>
              <input
                type="email"
                name="emailAddress"
                onChange={handleChange}
                value={shippingAddress.emailAddress}
                className={`w-full border border-gray-300 p-2 outline-none ${
                  errors.emailAddress ? "border-red-500 " : "border-gray-300"
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emailAddress}
                </p>
              )}
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
                className="flex justify-between mb-4 text-gray-500 italic text-sm flex-wrap"
              >
                <span className="uppercase break-words max-w-[70%]">
                  {item.name} ref {item._id?.slice(-5)} × {item.qty}
                </span>

                <span className="text-black font-medium whitespace-nowrap">
                  {item.price.toLocaleString()} $
                </span>
              </div>
            ))}

            <div className="flex justify-between border-t pt-4 font-bold">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()} $</span>
            </div>
            <div className="flex justify-between pt-4 pb-2 mb-2 font-bold">
              <span>ShippingFee</span>
              <span>{totalprice.toLocaleString()} $</span>
            </div>
            <div className="flex justify-between  border-t  pb-4 mb-6 font-bold text-[15px]">
              <span>Total</span>
              <span>{totalprice.toLocaleString()} $</span>
            </div>

            {/* PHƯƠNG THỨC THANH TOÁN */}
            <div className="space-y-4 text-[12px]">
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="payment"
                  id="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1"
                />
                <label htmlFor="cod" className="font-bold cursor-pointer">
                  Cod Goods and Services
                </label>
              </div>

              {paymentMethod === "cod" && (
                <div className="text-gray-600 leading-relaxed ml-6 italic">
                  Our Cod details will appear after you fill in your shipping
                  information...
                  <p className="mt-2">
                    Cash payment will incur an additional shipping fee of 30,000
                    VND per order nationwide.
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
              {paymentMethod === "bank" && (
                <div className="text-gray-600 leading-relaxed ml-6 italic">
                  Our bank transfer details will appear after you fill in your
                  shipping information completely and click the PLACE ORDER
                  button below. ————————————————————–
                  <p>
                    We will not be responsible if you transfer the funds using
                    incorrect payment details. Please contact us via Email or
                    WhatsApp to confirm the details before making the transfer.
                    ————————————————————–
                  </p>
                  <p>
                    Please include the payment description: SPACETIME – your
                    Order ID ————————————————————–
                  </p>
                  <p className="mt-2">
                    Your order will be shipped once the payment is confirmed.
                  </p>
                </div>
              )}

              <div className="flex items-start gap-3 mt-8">
                <input type="checkbox" id="terms" className="mt-1" />
                <label htmlFor="terms" className="cursor-pointer">
                  I have read and agree to the website{" "}
                  <b>terms and conditions</b>
                </label>
              </div>

              <button
                className="w-full bg-black text-white py-4 mt-4 uppercase tracking-[0.2em] font-bold hover:bg-gray-800 transition"
                type="submit"
                form="checkoutForm"
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
