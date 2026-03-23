import React from "react";

const articles = [
  {
    id: 1,
    title: "“LES MUST DE CARTIER!” – NGUỒN GỐC & SỨC MẠNH",
    date: "Tháng 12 27, 2021",
    image: "https://erawatch.vn/wp-content/uploads/2017/07/imgrc0071670529.jpg",
  },
  {
    id: 2,
    title: "JLC REVERSO – NGUỒN GỐC VÀ LỊCH SỬ TỒN TẠI",
    date: "Tháng mười một 22, 2021",
    image:
      "https://file.hstatic.net/200000456445/file/watches-you-should-know-cartier-tank-gear-patrol-lead-full_951d788f06b348b9ba5e48203b0f83d6_2048x2048.jpg",
  },
];

function AticlesBody() {
  return (
    <section className="bg-[#f5f5f5] py-12 md:py-20 px-4 md:px-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* TITLE */}
        <h2 className="text-xl md:text-3xl font-semibold tracking-wide mb-2">
          ACTICLES
        </h2>

        <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-10 max-w-xl mx-auto">
          Here are a few of our favorite insights into the world of vintage
          watches
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {articles.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm hover:shadow-md transition duration-300 rounded-md overflow-hidden"
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  className="w-full h-[200px] md:h-[260px] object-cover hover:scale-105 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 md:p-6 text-center">
                <h3 className="text-sm md:text-lg font-semibold mb-2 leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs md:text-sm mb-3">
                  {item.date}
                </p>

                {/* LINE */}
                <div className="w-8 md:w-10 h-[1px] bg-gray-300 mx-auto mb-3"></div>

                {/* BUTTON */}
                <button className="text-xs md:text-sm tracking-widest uppercase border-b border-black hover:opacity-70">
                  ĐỌC TIẾP
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AticlesBody;
