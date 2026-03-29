import React from "react";
// Import các icon cần thiết
// Nếu chưa cài, bạn chạy: npm install lucide-react

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  UserCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Sidebar({ open }) {
  const navigate = useNavigate();
  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/admin",
    },
    {
      name: "Products",
      icon: <Package size={18} />,
      path: "listproduct",
    },
    {
      name: "Orders",
      icon: <ShoppingBag size={18} />,
      path: "order",
    },

    { name: "Customers", icon: <UserCircle size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div
      className={`
        fixed top-0 left-0 h-full z-50
        bg-white border-r border-[#e5e5e5]
        transition-all duration-300 ease-in-out
        ${open ? "w-64" : "w-0"} 
        overflow-hidden
      `}
    >
      <div className="w-64">
        <div className="p-8">
          <h1 className="text-xl font-serif text-[#111] mb-10 leading-tight tracking-wide">
            Vintage <br /> Watch
          </h1>

          <nav>
            <ul className="space-y-2 text-[#6b6b6b] text-sm font-medium">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  onClick={() => navigate(item.path)}
                  className="group flex items-center gap-4 px-3 py-2.5 rounded-lg hover:bg-gray-50 hover:text-black cursor-pointer transition-all duration-200"
                >
                  {/* Icon với hiệu ứng màu khi hover vào hàng */}
                  <span className="text-[#9a9a9a] group-hover:text-black transition-colors">
                    {item.icon}
                  </span>

                  <span className="flex-1">{item.name}</span>

                  {/* Dấu chấm nhỏ tinh tế xuất hiện khi hover */}
                  <span className="w-1 h-1 bg-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
