import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { getCategories } from "@/utils/api";
import type { Category } from "@/types/category";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  let hoverTimeout: any;

  const handleEnter = (id: number) => {
    clearTimeout(hoverTimeout);
    setActive(id);
  };

  const handleLeave = () => {
    hoverTimeout = setTimeout(() => setActive(null), 150);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-60">
      <div className="flex items-center justify-between h-20 px-4 md:px-10">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} className="h-14 object-contain" />
        </Link>

        {/* Categories */}
        <ul className="hidden md:flex gap-10 items-center text-sm font-medium text-gray-700">

          {categories.map((cat) => (
            <li
              key={cat.id}
              className="relative group"
              onMouseEnter={() => handleEnter(cat.id)}
              onMouseLeave={handleLeave}
            >
              {/* CATEGORY CLICK */}
              <div
                onClick={() =>
                  navigate(`/products?category=${cat.id}`)
                }
                className="cursor-pointer relative"
              >
                {cat.title}

                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink-300 transition-all duration-300 group-hover:w-full"></span>
              </div>

              {/* DROPDOWN */}
              <AnimatePresence>
                {active === cat.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => handleEnter(cat.id)}
                    onMouseLeave={handleLeave}
                    className="absolute top-full left-0 mt-3 bg-white shadow-xl border border-gray-100 rounded-2xl min-w-50 overflow-hidden"
                  >
                    {cat.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        onClick={() =>
                          navigate(
                            `/products?category=${cat.id}&subcategory=${sub.id}`
                          )
                        }
                        className="px-5 py-3 text-sm text-gray-600 hover:bg-pink-50 hover:text-gray-900 cursor-pointer transition"
                      >
                        {sub.title}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

            </li>
          ))}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;