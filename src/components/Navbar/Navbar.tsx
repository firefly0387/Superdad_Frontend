import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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

  const toggleMobileCategory = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  // Helper function to navigate with category title (not ID)
  const navigateToCategory = (category: Category, subcategory?: { id: number; title: string }) => {
    if (subcategory) {
      navigate(`/products?category=${encodeURIComponent(category.title)}&subcategory=${encodeURIComponent(subcategory.title)}`);
    } else {
      navigate(`/products?category=${encodeURIComponent(category.title)}`);
    }
  };

  // Direct navigation for category buttons
  const handleCategoryClick = (category: Category, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    navigateToCategory(category);
  };

  // Direct navigation for subcategory buttons
  const handleSubcategoryClick = (category: Category, subcategory: { id: number; title: string }) => {
    navigateToCategory(category, subcategory);
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
          className={`w-full bg-[#5C3D2E] text-[#f5e7db] text-sm px-4 py-2 flex justify-between items-center transition-all duration-300 ${
            scrolled ? "opacity-90" : "opacity-100"
          }`}
        >
          {/* LEFT - Social Icons */}
          <div className="flex gap-3 text-sm items-center">
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
              href="https://wa.me/9861819558"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#E8D5B7] transition"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* RIGHT - Cart */}
          <div className="flex items-center gap-3 relative">
            <span className="font-medium text-[#f5e7db] text-xs md:text-sm hidden sm:inline">
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
              <img src={logo} className="h-12 md:h-14 object-contain" alt="logo" />
            </Link>

            {/* Desktop Categories */}
            <ul className="hidden md:flex gap-10 items-center text-sm font-medium">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="relative group"
                  onMouseEnter={(e) => handleEnter(cat.id, e)}
                  onMouseLeave={handleLeave}
                >
                  <button
                    onClick={() => handleCategoryClick(cat)}
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
                              handleSubcategoryClick(cat, sub);
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

            {/* Mobile Menu Button (Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#5C3D2E]/10 text-[#5C3D2E] hover:bg-[#5C3D2E]/20 transition-colors"
            >
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Cart Dropdown */}
      {openCart && <MiniCartDropdown onClose={() => setOpenCart(false)} />}

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#f5e7db] shadow-2xl z-50 md:hidden flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#E8D5B7] bg-[#5C3D2E]">
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <img src={logo} className="h-10 object-contain" alt="logo" />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              {/* Drawer Content - Categories */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 space-y-1">
                  {/* Home Link */}
                  <Link
                    to="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 text-[#5C3D2E] font-medium rounded-lg hover:bg-[#E8D5B7] transition-colors"
                  >
                    Home
                  </Link>

                  {/* Categories with Subcategories */}
                  {categories.map((cat) => (
                    <div key={cat.id} className="border-b border-[#E8D5B7] last:border-0">
                      <button
                        onClick={() => toggleMobileCategory(cat.id)}
                        className="w-full flex items-center justify-between px-4 py-3 text-[#5C3D2E] font-medium hover:bg-[#E8D5B7] transition-colors rounded-lg"
                      >
                        <span>{cat.title}</span>
                        <motion.span
                          animate={{ rotate: expandedCategory === cat.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-lg"
                        >
                          ▼
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {expandedCategory === cat.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-8 pb-2 space-y-1">
                              {/* Category itself (view all products in this category) */}
                              <button
                                onClick={() => {
                                  handleCategoryClick(cat);
                                  setMobileMenuOpen(false);
                                  setExpandedCategory(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm font-medium text-[#5C3D2E] hover:text-[#8B6914] hover:bg-[#E8D5B7]/50 transition-colors rounded-lg"
                              >
                                All {cat.title}
                              </button>
                              
                              {/* Subcategories */}
                              {cat.subcategories.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    handleSubcategoryClick(cat, sub);
                                    setMobileMenuOpen(false);
                                    setExpandedCategory(null);
                                  }}
                                  className="block w-full text-left px-4 py-2 text-sm text-[#795548] hover:text-[#8B6914] hover:bg-[#E8D5B7]/50 transition-colors rounded-lg"
                                >
                                  {sub.title}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Footer - Social Icons */}
              <div className="p-4 border-t border-[#E8D5B7] bg-white/30">
                <div className="flex justify-center gap-6">
                  <a
                    href="https://www.facebook.com/profile.php?id=61588601994404"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#5C3D2E] hover:text-[#8B6914] transition"
                  >
                    <FaFacebookF size={20} />
                  </a>
                  <a
                    href="https://www.instagram.com/superdad0387/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#5C3D2E] hover:text-[#8B6914] transition"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href="https://www.tiktok.com/@super_dad0387"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#5C3D2E] hover:text-[#8B6914] transition"
                  >
                    <FaTiktok size={20} />
                  </a>
                  <a
                    href="https://wa.me/9861819558"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#5C3D2E] hover:text-[#8B6914] transition"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>
                <p className="text-center text-xs text-[#795548] mt-3">
                  Superdad © {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;