// PRODUCT CARD
import React from "react";

function Card() {
  return (
    <div>
      <div className="bg-white p-6 rounded-[20px] border border-[#e5e5e5] shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:scale-[1.03] transition">
        <img
          src="https://images.unsplash.com/photo-1524592094714-0f0654e20314"
          alt="watch"
          className="w-full h-40 object-cover rounded-xl mb-4"
        />

        <h3 className="font-serif text-[#111] text-lg">Vintage Watch</h3>
        <p className="text-sm text-[#6b6b6b]">Classic leather</p>
        <p className="mt-2 text-black font-semibold">$1,200</p>
      </div>
    </div>
  );
}

export default Card;
