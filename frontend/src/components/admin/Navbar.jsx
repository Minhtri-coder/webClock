// NAVBAR
import { Search, Bell } from "lucide-react";
import React from "react";
import Sidebar from "./Sidebar";

function Navbar() {
  return (
    <div className="flex justify-between items-center bg-white border-b border-[#e5e5e5] ml-32 px-10 py-4">
      <div className="flex items-center gap-6">
        {/* <div className="flex items-center bg-[#f3f3f3] px-4 py-2 rounded-xl border border-[#e5e5e5]">
          <Search size={16} className="text-[#6b6b6b]" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm text-[#111]"
          />
        </div> */}

        <Bell className="text-[#6b6b6b] cursor-pointer hover:text-black" />

        <div className="w-8 h-8 bg-black rounded-full"></div>
      </div>
    </div>
  );
}

export default Navbar;
