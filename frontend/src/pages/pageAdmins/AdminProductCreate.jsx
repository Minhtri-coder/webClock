import React from "react";
import { useState } from "react";
import api from "../../libs/axios";
import { useNavigate } from "react-router-dom";

function AdminProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
    brand: "",
    category: "",
    description: "",
    details: {
      movement: "",
      caseSize: "",
      material: "",
      year: "",
      strap: "",
    },
  });

  const fetch = async () => {
    const token = localStorage.getItem("admin_token");
    const body = {
      name: form.name,
      price: form.price,
      image: form.image,
      brand: form.brand,
      category: form.category,
      description: form.description,
      details: {
        movement: form.movement,
        caseSize: form.caseSize,
        material: form.material,
        year: form.year,
        strap: form.strap,
      },
    };
    try {
      const res = await api.post("/products", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("bị lỗi");
      console.log(error.response?.data);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleDetails = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      details: {
        ...form.details,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch();
    console.log(form);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Thêm sản phẩm</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-5">
            <h2 className="font-semibold text-lg">Thông tin cơ bản</h2>

            <input
              name="name"
              placeholder="Tên sản phẩm"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="price"
              type="number"
              placeholder="Giá"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="brand"
              placeholder="Thương hiệu"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="category"
              placeholder="Category ID"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Mô tả sản phẩm"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg h-32"
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-5">
            <h2 className="font-semibold text-lg">Hình ảnh & Thông số</h2>

            <input
              name="image"
              placeholder="Link ảnh"
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            {/* Preview ảnh */}
            {form.image && (
              <img
                src={form.image}
                alt=""
                className="w-full h-48 object-cover rounded-lg border"
              />
            )}

            {/* Details */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="movement"
                placeholder="Bộ máy"
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="caseSize"
                placeholder="Size mặt"
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="material"
                placeholder="Chất liệu"
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="year"
                placeholder="Năm"
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="strap"
                placeholder="Dây"
                onChange={handleDetails}
                className="border p-2 rounded col-span-2"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="col-span-2 text-right">
            <button
              className="bg-black text-white px-8 py-3 rounded-xl hover:opacity-80"
              type="submit"
              onClick={() => navigate("/admin/listproduct")}
            >
              Lưu sản phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductCreate;
