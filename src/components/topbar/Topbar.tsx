import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import MiniCartDropdown from "../home/MiniCartDropdown";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const TopBar = () => {
  const { state, total } = useCart();

  const [openCart, setOpenCart] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setOpenCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 w-full bg-[#e9e4df] text-gray-700 text-sm px-6 py-2 flex justify-between items-center z-70">
      {/* LEFT */}
      <div className="flex gap-4 text-sm items-center">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/profile.php?id=61588601994404"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black transition"
        >
          <FaFacebookF />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/superdad0387/"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black transition"
        >
          <FaInstagram />
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@super_dad0387"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black transition"
        >
          <FaTiktok />
        </a>
         <a
          href="https://www.tiktok.com/@super_dad0387"
          target="_blank"
          rel="noreferrer"
          className="hover:text-black transition"
        >
          <FaWhatsapp />
        </a>
      </div>

      {/* RIGHT */}
      <div ref={cartRef} className="flex items-center gap-5 relative">
        <span className="font-medium">Rs {total.toLocaleString()}</span>

        {/* CART ICON */}
        <div
          onClick={() => setOpenCart((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <FiShoppingCart className="text-lg" />

          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {state.items.length}
            </span>
          )}
        </div>

        {openCart && <MiniCartDropdown onClose={() => setOpenCart(false)} />}
      </div>
    </div>
  );
};

export default TopBar;
