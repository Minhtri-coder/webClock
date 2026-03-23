import { Search, ShoppingBag, Instagram } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";
import { Cartcontext } from "../pages/Cartcontext";
import SideCart from "../components/ui/SideCart";

function HeaderHome() {
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [categoies, setCategories] = useState([]);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  //cart
  const { cartItems, subtotal, totalItems } = useContext(Cartcontext);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    //category

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/category");
        console.log(res.data); // 👈 check ở đây

        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative h-screen w-full text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://www.analogshift.com/cdn/shop/files/AS09565_40950280_CARTIER_SANTOSGALBEEMOONPHASEYG_819901-8.jpg?v=1730498893')",
        }}
      />

      <div className="absolute inset-0 bg-black/30"></div>

      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"}`}
      >
        {/* NÚT MENU MOBILE */}
        <div className="absolute right-4 top-4 md:hidden z-50">
          <button onClick={() => setOpenMobileMenu(!openMobileMenu)}>☰</button>
        </div>

        {/* top bar */}
        <div className="flex justify-between items-center px-4 md:px-10 lg:px-16 py-3 text-xs md:text-sm opacity-90">
          <div className="flex items-center gap-4">
            <span>{time.toLocaleTimeString()}</span>
            <Instagram size={16} />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="tracking-[0.4em]">VII EN</span>

            <button className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Side Cart Drawer */}
            {isOpen && <SideCart isOpen={isOpen} setIsOpen={setIsOpen} />}
            <Search size={18} />
          </div>
        </div>

        {/* logo */}
        <div className="text-center mt-2">
          <p className="text-[16px] md:text-[22px] tracking-[0.4em] md:tracking-[0.55em] font-light">
            SPACETIME
          </p>
          <p className="text-[10px] md:text-[12px] tracking-[0.5em] md:tracking-[0.7em]">
            VINTAGE WATCH
          </p>
        </div>

        {/* navigation */}
        <nav
          className={`hidden md:flex justify-center gap-6 lg:gap-10 mt-6 text-[12px] lg:text-[13px] tracking-[0.2em] 
  ${scrolled ? "text-black" : "text-white"}`}
        >
          <div
            className="relative"
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}
          >
            <a className="cursor-pointer">WATCHES</a>
            <div className="absolute top-full left-0 w-full h-2"></div>
            {/* Dropdown */}
            {openMenu && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[260px] bg-[#f2f2f2] shadow-lg z-50">
                {/* Tam giác */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 
              w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] 
              border-l-transparent border-r-transparent border-b-[#f2f2f2]"
                ></div>
                {/* List category */}
                {categoies.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => navigate(`/products?category=${item.name}`)}
                    className="py-4 text-center border-b text-gray-700 
                     cursor-pointer hover:text-black hover:bg-gray-200"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <a className="cursor-pointer hover:opacity-90">CONSIGNMENT</a>
          <a className="cursor-pointer hover:opacity-90">ARTICLES</a>
          <a className="cursor-pointer hover:opacity-90">ABOUT US</a>
          <a className="cursor-pointer hover:opacity-90">ARCHIVES</a>
          <a className="cursor-pointer hover:opacity-90">CONSIGN YOUR WATCH</a>
        </nav>
      </header>

      {openMobileMenu && (
        <div className="fixed inset-0 bg-black text-white z-[999] flex flex-col items-center justify-center gap-6 text-lg">
          <p onClick={() => setOpenMobileMenu(false)}>WATCHES</p>
          <p>CONSIGNMENT</p>
          <p>ARTICLES</p>
          <p>ABOUT US</p>
          <p>ARCHIVES</p>
          <p>CONSIGN YOUR WATCH</p>
        </div>
      )}

      {/* HERO TEXT */}
      <div className="relative z-40 flex items-center h-full pl-[15%]">
        <div>
          <div className="bg-black/40 px-6 py-4 mb-6">
            <p className="text-[18px]">
              Vintage Rolex timepieces always carry a unique allure
            </p>
          </div>

          <button className="border-b border-white pb-1 hover:opacity-70">
            Learn More
          </button>
        </div>
      </div>

      {/* slider dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        <div className="w-2 h-2 bg-white/50 rounded-full"></div>
      </div>
    </div>
  );
}

export default HeaderHome;
