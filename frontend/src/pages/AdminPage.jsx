import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "../components/admin/Sidebar";
import { Menu } from "lucide-react";
import Navbar from "../components/admin/Navbar";
import Product from "./pageAdmins/Products";

// APP
export default function AdminPage() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex min-h-screen bg-[#f8f8f8]">
      <Sidebar open={open} />
      <div
        className={`
          flex-1 transition-all duration-300
          ${open ? "ml-64" : "ml-0"}
        `}
      >
        <div className="sticky top-0 z-10 flex items-center gap-4 p-4 border-b bg-white w-full">
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <h2 className="flex-1 text-sm font-medium tracking-wide text-gray-700">
            SPACETIME
          </h2>
          <Navbar />
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 lg:hidden"
        />
      )}
    </div>
  );
}
