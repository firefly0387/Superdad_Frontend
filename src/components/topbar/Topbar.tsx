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
    <div className="w-full bg-[#5C3D2E] text-[#f5e7db] text-sm px-6 py-2 flex justify-between items-center fixed top-0 z-50">
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
      <div ref={cartRef} className="flex items-center gap-5 relative">
        <span className="font-medium text-[#f5e7db]">Rs {total.toLocaleString()}</span>

        {/* CART ICON */}
        <div
          onClick={() => setOpenCart((prev) => !prev)}
          className="relative cursor-pointer"
        >
          <FiShoppingCart className="text-lg" />

          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-[#f5e7db] text-[#5C3D2E] text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
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