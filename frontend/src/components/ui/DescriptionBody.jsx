import React from "react";

function DescriptionBody() {
  return (
    <section className="bg-[#f5f5f5] py-16 px-6 md:px-20">
      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wide uppercase leading-snug mb-6">
            SPACETIME – A MISSION TO BRING ELEGANCE TO MILLIONS OF VIETNAMESE
            WRISTS
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            Vintage watches have long left deep imprints across time — marking
            decades, even centuries — evoking memories of a bygone era. Born
            with the mission to deliver timeless elegance to every wrist,
            Spacetime represents two precious moments we all hold dear: “Now and
            Here.” With each passing second, we’re reminded to live fully in the
            present — no matter the time, no matter the place.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            From wandering the world to expressing your unique style, wherever
            you are and whatever you do, Spacetime is always with you — here,
            now, and on your wrist.
          </p>

          <button className="text-sm tracking-widest uppercase border-b border-black hover:opacity-70 transition">
            READ MORE {"<<"}
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://crownvintage.com.au/cdn/shop/collections/cariter-tank-18mm-vermiel-must-de-cartier-80-90s-1.jpg?v=1733486455" // đổi path ảnh của bạn
            alt="watch"
            className="w-full max-w-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default DescriptionBody;
