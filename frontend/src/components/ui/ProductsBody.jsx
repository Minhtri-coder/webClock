import React, { useEffect, useState } from "react";
import api from "../../libs/axios";
import { useNavigate } from "react-router-dom";

function ProductsBody() {
  const [index, setIndex] = useState(0);
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();

  const fechTask = async () => {
    try {
      const res = await api.get("/products");
      setproduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fechTask();
  }, []);

  const prev = () => {
    setIndex((prev) => (prev === 0 ? product.length - 1 : prev - 1));
  };

  const next = () => {
    setIndex((prev) => (prev === product.length - 1 ? 0 : prev + 1));
  };

  const getItem = (offset) => {
    if (product.length === 0) return null;
    let i = (index + offset + product.length) % product.length;
    return product[i];
  };

  return (
    <section className="py-10 md:py-16 text-center px-4">
      <h2 className="text-xl md:text-3xl font-semibold mb-2">SHOP NOW</h2>
      <p className="text-gray-500 mb-6 md:mb-10 text-sm md:text-base">
        Come visit our store
      </p>

      <div className="relative flex items-center justify-center mt-6 md:mt-10">
        {/* LEFT (ẩn trên mobile) */}
        <div className="hidden md:block opacity-30 w-52 lg:w-64 transition-all duration-500 mr-4">
          <img
            src={getItem(-1)?.image}
            className="w-full h-[220px] lg:h-[250px] object-cover"
          />
          <p className="mt-3 text-sm">{getItem(-1)?.name}</p>
          <p className="font-semibold">
            {getItem(-1)?.price.toLocaleString("vi-VN") + " đ"}
          </p>
        </div>

        {/* CENTER */}
        <div
          className="w-full max-w-xs md:max-w-sm lg:w-80 transition-all duration-500 cursor-pointer"
          onClick={() => navigate(`/productDetails?id=${getItem(0)?._id}`)}
        >
          <div className="w-full max-w-xs md:max-w-sm lg:w-80 transition-all duration-500">
            <img
              src={getItem(0)?.image}
              className="w-full h-[250px] md:h-[300px] object-cover"
            />
            <p className="mt-4 text-sm md:text-base">{getItem(0)?.name}</p>
            <p className="font-semibold">
              {getItem(0)?.price.toLocaleString("vi-VN") + " đ"}
            </p>
          </div>
        </div>

        {/* RIGHT (ẩn trên mobile) */}
        <div className="hidden md:block opacity-30 w-52 lg:w-64 transition-all duration-500 ml-4">
          <img
            src={getItem(1)?.image}
            className="w-full h-[220px] lg:h-[250px] object-cover"
          />
          <p className="mt-3 text-sm">{getItem(1)?.name}</p>
          <p className="font-semibold">
            {getItem(1)?.price.toLocaleString("vi-VN") + " đ"}
          </p>
        </div>

        {/* BUTTON LEFT */}
        <button
          onClick={prev}
          className="absolute left-2 md:left-10 text-2xl md:text-3xl"
        >
          ❮
        </button>

        {/* BUTTON RIGHT */}
        <button
          onClick={next}
          className="absolute right-2 md:right-10 text-2xl md:text-3xl"
        >
          ❯
        </button>
      </div>
    </section>
  );
}

export default ProductsBody;
