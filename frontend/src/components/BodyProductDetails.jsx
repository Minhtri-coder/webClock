import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../libs/axios";
import { Cartcontext } from "../pages/Cartcontext";

function BodyProductDetails() {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const [isOpenImg, setIsOpenImg] = useState(false);
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const { addToCart, setIsOpen, isOpen, errorMsg } = useContext(Cartcontext);

  const [message, setMessage] = useState("");

  const handleAddToCart = (product) => {
    // addToCart trả về true nếu đã tồn tại
    const isExist = addToCart(product);

    if (isExist) {
      setMessage("Sản phẩm đã có trong giỏ hàng");
    } else {
      setIsOpen(true); // mở cart chỉ khi thêm mới
    }

    // auto ẩn message sau 2s
    setTimeout(() => setMessage(""), 2000);
  };

  const fetch = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data || []);
      console.log("hiện thị sản phẩm chi tiết thành công", res.data);
    } catch (error) {
      console.log("bị lỗi");
    }
  };

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  if (!product) {
    return <p>Đang loading...</p>;
  }

  return (
    <section className="py-12 px-4 md:px-16 bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-0 items-start">
        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg scale-95 animate-zoom"
            onClick={() => setIsOpenImg(true)} // mở modal khi click
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="space-y-4">
          {/* Product Title & Price */}
          <div>
            <h2 className="text-lg md:text-xl font-serif tracking-wide uppercase">
              {/* ROLEX DAY-DATE ref 18238 */} {product.name}
            </h2>
            <p className="text-lg md:text-xl font-semibold text-gray-800 mt-1">
              {/* $10,200 */}
              {product.price}
            </p>
          </div>

          {/* Product Description */}
          <div className="text-gray-700 space-y-2 text-sm md:text-sm leading-relaxed font-serif max-w-[500px]">
            <h3 className="text-sm md:text-base font-serif tracking-wide uppercase">
              {product.brand}
            </h3>
            <p>{product.description}</p>
          </div>

          {/* Stock & Add to Cart */}
          <div className="flex flex-col  items-start gap-3">
            <button className="bg-black text-white  px-38   py-2 uppercase tracking-widest text-sm hover:opacity-80 transition">
              constact us
            </button>
            <p className="text-gray-600 text-sm font-serif">
              {product.countInStock} in stock
            </p>
            <button
              className="bg-black text-white px-4 py-2 uppercase tracking-widest text-sm hover:opacity-80 transition"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
            >
              Add to Cart
            </button>
            <p className="text-red-500 mt-1 text-sm h-5">
              {message || "\u00A0"} {/* &nbsp; để giữ dòng trống */}
            </p>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-16">
        {/* Title */}
        <h3 className="text-xl tracking-[0.2em] font-light mb-8 text-gray-800">
          DESCRIPTION
        </h3>

        {/* Table */}
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-3 py-3 border-b border-gray-200">
            <span className="text-gray-500">Brand:</span>
            <span className="col-span-2 italic text-gray-600">
              {product?.brand}
            </span>
          </div>

          <div className="grid grid-cols-3 py-3 border-b border-gray-200">
            <span className="text-gray-500">material:</span>
            <span className="col-span-2 italic text-gray-600">
              {product.details?.material}
            </span>
          </div>

          <div className="grid grid-cols-3 py-3 border-b border-gray-200">
            <span className="text-gray-500">Movement:</span>
            <span className="col-span-2 italic text-gray-600">
              {product.details?.movement}
            </span>
          </div>

          <div className="grid grid-cols-3 py-3 border-b border-gray-200">
            <span className="text-gray-500">Case Size:</span>
            <span className="col-span-2 italic text-gray-600">
              {product.details?.caseSize}
            </span>
          </div>

          <div className="grid grid-cols-3 py-3 border-b border-gray-200">
            <span className="text-gray-500">Year:</span>
            <span className="col-span-2 italic text-gray-600">
              {product.details.year}
            </span>
          </div>
        </div>
      </div>

      {isOpenImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setIsOpenImg(false)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </section>
  );
}

export default BodyProductDetails;
