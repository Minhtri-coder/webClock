import { Search, ShoppingBag, Instagram } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import api from "../libs/axios";
import { useNavigate } from "react-router-dom";
import { Cartcontext } from "../pages/Cartcontext";
import SideCart from "./ui/SideCart";

function HeaderCheckout() {
  const [time, setTime] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [categoies, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);

  const { cartItems, subtotal, totalItems, isOpen, setIsOpen } =
    useContext(Cartcontext);

  const navigate = useNavigate();
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

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  //mobile
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
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
    <div className="relative h-[170px] w-full text-white overflow-hidden">
      {/* HEADER */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300
    ${scrolled ? "bg-white/90 text-black shadow-md" : "transparent-white text-black shadow-md"}`}
      >
        {/* top bar */}
        <div className="flex justify-between items-center px-16 py-3 text-sm opacity-90">
          <div className="flex items-center gap-4">
            <span>{time.toLocaleTimeString()}</span>
            <Instagram size={16} />
          </div>

          <div className="flex items-center gap-6">
            <span className="tracking-[0.4em]">VII EN</span>
            <button className="relative" onClick={() => setIsOpen(true)}>
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            {isOpen && <SideCart isOpen={isOpen} setIsOpen={setIsOpen} />}
            <Search size={18} />
          </div>
        </div>

        {/* logo */}
        <div className="text-center mt-2">
          <p className="text-[22px] tracking-[0.55em] font-light">SPACETIME</p>
          <p className="text-[12px] tracking-[0.7em]">VINTAGE WATCH</p>
        </div>

        {/* navigation */}
        <nav
          className={`flex justify-center gap-10 mt-6 text-[13px] tracking-[0.25em] bg-white
    ${scrolled ? "text-black" : "text-black"}`}
        >
          {/* WATCHES */}
          <div
            className="relative"
            onMouseEnter={() => !isMobile && setOpenMenu(true)}
            onMouseLeave={() => !isMobile && setOpenMenu(false)}
          >
            <a
              className="cursor-pointer"
              onClick={() => {
                if (isMobile) {
                  setOpenMenu(!openMenu); // mobile click
                } else {
                  navigate("/"); // desktop giữ nguyên
                }
              }}
            >
              WATCHES
            </a>
            <div className="absolute top-full left-0 w-full h-2"></div>

            {/* Dropdown */}
            {openMenu && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 
            w-[260px] bg-[#f2f2f2] text-black shadow-xl z-50"
              >
                {/* triangle */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 
              w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] 
              border-l-transparent border-r-transparent border-b-[#f2f2f2]"
                />

                {categoies.map((item, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      navigate(
                        `/products?category=${encodeURIComponent(item.name)}`,
                      )
                    }
                    className="py-4 text-center border-b text-gray-700 
                cursor-pointer hover:bg-gray-200 hover:text-black"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <a className="cursor-pointer">CONSIGNMENT</a>
          <a className="cursor-pointer">ARTICLES</a>
          <a className="cursor-pointer">ABOUT US</a>
          <a className="cursor-pointer">ARCHIVES</a>
          <a className="cursor-pointer">CONSIGN YOUR WATCH</a>
        </nav>
      </header>

      {/* HERO CONTENT */}
      <div className="relative z-40 flex justify-between items-end h-full px-20 pb-10">
        {/* RIGHT: SORT BUTTON */}
        <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full text-sm">
          Sort by price: low to high
        </div>
      </div>
    </div>
  );
}

export default HeaderCheckout;
