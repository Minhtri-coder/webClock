import React, { useEffect, useState } from "react";
import api from "../../libs/axios";
import { useNavigate } from "react-router-dom";

function AdminProductUpdate() {
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const id = params.get("id");

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
    try {
      const res = await api.get(`/products/${id}`);
      setForm(res.data.data);
      console.log("cập nhập thành công", res.data.data);
    } catch (error) {
      console.log("bị lỗi", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetch();
    }
  }, [id]);

  const fetchupdate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await api.put(`/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setForm(res.data.data);
      console.log("cập nhập thành công", res.data.data);
    } catch (error) {
      console.log("bị lỗi", error);
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
    fetchupdate();
    console.log(form);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Chỉnh sửa sản phẩm</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
          {/* LEFT */}
          <div className="space-y-5">
            <h2 className="font-semibold text-lg">Thông tin cơ bản</h2>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="brand"
              value={form.brand}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <input
              name="category"
              placeholder="Category ID"
              value={form.category}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            />

            <textarea
              name="description"
              placeholder="Mô tả sản phẩm"
              value={form.description}
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
              value={form.image}
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
                value={form.details?.movement || ""}
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="caseSize"
                placeholder="Size mặt"
                value={form.details?.caseSize || ""}
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="material"
                placeholder="Chất liệu"
                value={form.details?.material || ""}
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="year"
                placeholder="Năm"
                value={form.details?.year || ""}
                onChange={handleDetails}
                className="border p-2 rounded"
              />

              <input
                name="strap"
                placeholder="Dây"
                value={form.details?.strap || ""}
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

export default AdminProductUpdate;
