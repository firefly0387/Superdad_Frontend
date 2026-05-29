import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import MiniCartDropdown from "../home/MiniCartDropdown";
import logo from "@/assets/logo.png";
import { getCategories } from "@/utils/api";
import type { Category } from "@/types/category";

const Header = () => {
  const navigate = useNavigate();
  const { state, total } = useCart();

  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [openCart, setOpenCart] = useState(false);

  const [dropdownAlign, setDropdownAlign] = useState<"left" | "right">("left");
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch categories
  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleEnter = (id: number, e: React.MouseEvent<HTMLLIElement>) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);

    const rect = e.currentTarget.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.left;
    setDropdownAlign(spaceRight < 220 ? "right" : "left");
    setActive(id);
  };

  const handleLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setActive(null);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-[#f5e7db] shadow-md" : "bg-transparent"
        }`}
      >
        {/* Top Bar - Social Icons & Cart */}
        <div
          className={`w-full bg-[#5C3D2E] text-[#f5e7db] text-sm px-6 py-2 flex justify-between items-center transition-all duration-300 ${
            scrolled ? "opacity-90" : "opacity-100"
          }`}
        >
          {/* LEFT - Social Icons */}
          <div className="flex gap-4 text-sm items-center">
            <a
              href="https://www.facebook.com/profile.php?id=61588601994404"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8D5B7] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/superdad0387/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8D5B7] transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@super_dad0387"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8D5B7] transition"
            >
              <FaTiktok />
            </a>
            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8D5B7] transition"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* RIGHT - Cart */}
          <div className="flex items-center gap-5 relative">
            <span className="font-medium text-[#f5e7db]">
              Rs {total.toLocaleString()}
            </span>

            {/* CART ICON */}
            <button
              onClick={() => setOpenCart(!openCart)}
              className="relative cursor-pointer bg-transparent border-none"
            >
              <FiShoppingCart className="text-lg text-[#f5e7db]" />

              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#f5e7db] text-[#5C3D2E] text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {state.items.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navbar */}
        <div className="bg-inherit">
          <div className="flex items-center justify-between h-20 px-4 md:px-10">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} className="h-14 object-contain" alt="logo" />
            </Link>

            {/* Categories */}
            <ul className="hidden md:flex gap-10 items-center text-sm font-medium">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={(e) => handleEnter(cat.id, e)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    onClick={() => navigate(`/products?category=${cat.id}`)}
                    className={`cursor-pointer relative transition-colors duration-300 bg-transparent border-none ${
                      scrolled ? "text-[#5C3D2E]" : "text-[#5C3D2E]"
                    }`}
                  >
                    {cat.title}
                    <span
                      className={`absolute left-0 -bottom-1 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                        scrolled ? "bg-[#8B6914]" : "bg-[#8B6914]"
                      }`}
                    ></span>
                  </button>

                  {/* Category DROPDOWN */}
                  <AnimatePresence>
                    {active === cat.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        onMouseEnter={() => setActive(cat.id)}
                        onMouseLeave={handleLeave}
                        className={`absolute top-full mt-3 bg-white shadow-xl border rounded-2xl min-w-52 overflow-hidden z-50 ${
                          dropdownAlign === "right" ? "right-0" : "left-0"
                        } ${scrolled ? "border-[#E8D5B7]" : "border-white/20"}`}
                      >
                        {cat.subcategories.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              navigate(
                                `/products?category=${cat.id}&subcategory=${sub.id}`,
                              );
                              setActive(null);
                            }}
                            className={`w-full text-left px-5 py-3 text-sm cursor-pointer transition-colors duration-200 ${
                              scrolled
                                ? "text-[#5C3D2E] hover:bg-[#f5e7db]"
                                : "text-[#5C3D2E] hover:bg-gray-50"
                            }`}
                          >
                            {sub.title}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Cart Dropdown */}
      {openCart && <MiniCartDropdown onClose={() => setOpenCart(false)} />}
    </>
  );
};

export default Header;