import React, { useState } from "react";

export default function AdminDetailsProduct() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [order, setOrder] = useState({
    _id: id,
    status: "pending",
    createdAt: new Date(),
    shippingAddress: {
      firstName: "Nguyen",
      lastName: "Van A",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
    },
    orderItems: [
      {
        name: "Sản phẩm cao cấp A",
        price: 200000,
        qty: 2,
        image: "https://via.placeholder.com/80",
      },
    ],
  });

  const [status, setStatus] = useState(order.status);

  const subtotal = order.orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  const shippingFee = 30000;
  const total = subtotal + shippingFee;

  const handleUpdate = () => {
    setOrder((prev) => ({ ...prev, status }));
    alert("Cập nhật thành công!");
  };

  const getStatusStyle = (s) => {
    switch (s) {
      case "done":
        return "bg-green-100 text-green-700";
      case "cancel":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
          <p className="text-sm text-gray-500">
            ID: #{order._id} • {order.createdAt.toLocaleDateString("vi-VN")}
          </p>
        </div>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
            order.status,
          )}`}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          {/* PRODUCTS */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-4">Sản phẩm</h2>

            {order.orderItems.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center py-3">
                  <div className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.price.toLocaleString("vi-VN")} đ × {item.qty}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    {(item.price * item.qty).toLocaleString("vi-VN")} đ
                  </p>
                </div>

                {index !== order.orderItems.length - 1 && (
                  <hr className="my-2 border-dashed" />
                )}
              </div>
            ))}
          </div>

          {/* CUSTOMER */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-3">Khách hàng</h2>
            <p className="font-medium">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-sm text-gray-500">
              📞 {order.shippingAddress.phone}
            </p>
          </div>

          {/* ADDRESS */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-3">Địa chỉ giao hàng</h2>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.address}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* SUMMARY */}
          <div className="bg-gray-900 text-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-4">Tổng tiền</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Tạm tính</span>
                <span>{subtotal.toLocaleString("vi-VN")} đ</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Phí ship</span>
                <span>{shippingFee.toLocaleString("vi-VN")} đ</span>
              </div>

              <hr className="border-gray-700 my-2" />

              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng</span>
                <span className="text-green-400">
                  {total.toLocaleString("vi-VN")} đ
                </span>
              </div>
            </div>
          </div>

          {/* UPDATE STATUS */}
          <div className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold mb-3">Cập nhật trạng thái</h2>

            <select
              className="w-full border rounded-lg p-2 mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="done">Done</option>
              <option value="cancel">Cancel</option>
            </select>

            <button
              onClick={handleUpdate}
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Lưu thay đổi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
