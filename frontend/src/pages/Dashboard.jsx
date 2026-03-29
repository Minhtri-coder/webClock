import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import Card from "../components/admin/Card";
import api from "../libs/axios";
import { useEffect, useState } from "react";

const data = [
  { name: "Jan", value: 200 },
  { name: "Feb", value: 400 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 600 },
];

function Dashboard() {
  const [order, setOrder] = useState({});

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const sumOrder = await api.get("/order/sumOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(sumOrder.data);
      console.log("thành công sumorder");
      setOrder(sumOrder.data);
    } catch (error) {
      console.log("bị lỗi sumorder");
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#f8f8f8] text-[#111]">
      {/* <Navbar /> */}

      <div className="p-12 space-y-10">
        {/* <h1 className="text-3xl font-serif text-black">Vintage Overview</h1> */}

        {/* Cards */}
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[20px] border border-[#e5e5e5] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
            <p className="text-[#6b6b6b]">Total Revenue</p>
            <h2 className="text-3xl mt-3 font-serif text-black">
              {order.totalRevenus
                ? order.totalRevenus.toLocaleString("vi-VN") + "đ"
                : "0 đ"}
            </h2>
          </div>

          <div className="bg-white p-8 rounded-[20px] border border-[#e5e5e5] shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
            <p className="text-[#6b6b6b]">Orders</p>
            <h2 className="text-3xl mt-3 font-serif text-black">
              {" "}
              {order.totalOrder}
            </h2>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white p-10 rounded-[20px] border border-[#e5e5e5] h-72 shadow-[0_8px_20px_rgba(0,0,0,0.05)]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#111"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Products */}
        <div>
          <h2 className="text-2xl font-serif mb-6 text-black">
            Featured Watches
          </h2>

          <div className="grid grid-cols-3 gap-6">
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
