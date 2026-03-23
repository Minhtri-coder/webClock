import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";
import { Cartcontext } from "../pages/Cartcontext";

function BodyListProducts() {
  const location = useLocation();
  const category = new URLSearchParams(location.search).get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart, setIsOpen, errorMsg, cartItem } = useContext(Cartcontext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!category) return;
      setLoading(true);
      try {
        const res = await api.get("/products/category", {
          params: { category },
        });
        setProducts(res.data || []);
      } catch (error) {
        console.log("Lỗi khi lấy sản phẩm:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category]);

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-16 py-10 bg-[#f5f5f5]">
      {/* LEFT IMAGE */}
      <div className="hidden md:block w-[340px]">
        <div className="sticky top-24 h-[600px] overflow-hidden">
          <img
            src="https://www.analogshift.com/cdn/shop/files/AS09565_40950280_CARTIER_SANTOSGALBEEMOONPHASEYG_819901-8.jpg"
            alt="Feature"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* RIGHT PRODUCTS */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 md:ml-10">
        {loading ? (
          <p className="col-span-full text-center text-lg">Loading...</p>
        ) : products.length === 0 ? (
          <p className="col-span-full text-center text-lg">
            Không có sản phẩm cho category này.
          </p>
        ) : (
          products.map((item, index) => {
            const isInCart = cartItem.some((i) => i._id === item._id);
            return (
              <div
                key={index}
                className="group"
                onClick={() => navigate(`/productDetails?id=${item._id}`)}
              >
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] bg-white overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* NAME */}
                <h3 className="mt-4 text-[13px] sm:text-[14px] tracking-[0.25em] uppercase font-medium leading-snug">
                  {item.name}
                </h3>

                {/* PRICE */}
                <p className="mt-2 text-[14px] font-bold">{item.price} $</p>

                {/* BUTTON */}
                <button
                  className={`mt-4 border-2 px-6 py-2 text-[12px] font-bold tracking-wider transition-all duration-200
    ${
      isInCart
        ? "bg-black text-white"
        : "border-black hover:bg-black hover:text-white"
    }`}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (isInCart) {
                      navigate("/cart"); // 👈 chuyển trang
                    } else {
                      addToCart(item);
                      setIsOpen(true); // mở side cart
                    }
                  }}
                >
                  {isInCart ? "VIEW CART ->" : "ADD TO CART"}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default BodyListProducts;
