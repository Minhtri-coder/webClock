import React from "react";

import { Facebook, Instagram, Mail, Phone, ChevronUp } from "lucide-react";

function FooterListProduct() {
  return (
    <footer className="w-full bg-white text-[#1a1a1a] font-light">
      {/* 1. Top bar: Chữ in hoa, giãn chữ rộng, nền xám nhạt */}
      <div className="bg-[#eeeeee] py-3">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center text-[11px] tracking-[0.2em] font-medium uppercase">
          <span>6 Months Warranty</span>
          <span>Shipping Worldwide</span>
          <span>Exchange Policy</span>
        </div>
      </div>

      {/* 2. Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-[13px]">
        {/* Cột 1: ABOUT US */}
        <div className="flex flex-col items-center">
          <h3 className="uppercase tracking-[0.15em] mb-8 pb-1 border-b border-black text-[15px] font-normal">
            About Us
          </h3>
          <ul className="space-y-4 text-center tracking-wide">
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              Warranty Policy
            </li>
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              Exchange Policy
            </li>
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              Payment & Shipping Methods
            </li>
            <li className="hover:text-gray-500 cursor-pointer transition-colors">
              Consign Your Watch
            </li>
          </ul>
        </div>

        {/* Cột 2: CONTACT */}
        <div className="flex flex-col items-center">
          <h3 className="uppercase tracking-[0.15em] mb-8 pb-1 border-b border-black text-[15px] font-normal">
            Contact
          </h3>
          <div className="space-y-4 text-center tracking-wide leading-relaxed">
            <p>
              <span className="font-bold">Email:</span>{" "}
              spacetime.donghocodien@gmail.com
            </p>
            <p>
              <span className="font-bold">WhatsApp:</span> +84 94 162 5653
            </p>
          </div>
        </div>

        {/* Cột 3: FOLLOW US */}
        <div className="flex flex-col items-center">
          <h3 className="uppercase tracking-[0.15em] mb-8 pb-1 border-b border-black text-[15px] font-normal">
            Follow Us
          </h3>
          {/* Social Icons tròn đen */}
          <div className="flex gap-2 mb-6">
            {[Facebook, Instagram, Mail, Phone].map((Icon, index) => (
              <div
                key={index}
                className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-700 cursor-pointer transition-all"
              >
                <Icon
                  size={16}
                  fill={
                    Icon === Facebook || Icon === Instagram ? "white" : "none"
                  }
                />
              </div>
            ))}
          </div>
          {/* Logo DMCA xích xuống */}
          <div className="mt-2">
            <img
              src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=..."
              alt="DMCA Protected"
              className="h-[22px] grayscale opacity-80"
            />
          </div>
        </div>
      </div>

      {/* Floating Buttons (Messenger & Back to top) */}
    </footer>
  );
}

export default FooterListProduct;
