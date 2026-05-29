import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const links = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Shop", path: "/products" },
    ],
    support: [
      { name: "Shipping Policy", path: "/shipping-policy" },
      { name: "Refund Policy", path: "/refund-policy" },
      { name: "Payment Policy", path: "/payment-policy" },
    ],
    legal: [
      { name: "Terms & Conditions", path: "/terms-and-conditions" },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-[#f5e7db] border-t border-[#E8D5B7]/50">
      {/* SOFT FLOATING BACKGROUND - Updated to match theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-[#E8D5B7]/30 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-[#D4C4A8]/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#E8D5B7]/20 rounded-full blur-3xl"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-12 py-16 md:py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-light flex items-center gap-2 text-[#5C3D2E]">
              Superdad
              <span className="text-rose-500">❤</span>
            </h2>

            <p className="text-[#5C3D2E]/70 text-sm mt-4 leading-relaxed">
              A modern parenting platform for baby essentials, kids products,
              and family-first shopping experiences.
              <br /><br />
              Built to support both mothers and fathers equally in their parenting journey.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-[#8B6914] mb-4 tracking-wider">
              Company
            </h3>

            <ul className="space-y-3 text-sm">
              {links.company.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer text-[#5C3D2E]/70 hover:text-[#5C3D2E] transition hover:translate-x-1"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-[#8B6914] mb-4 tracking-wider">
              Support
            </h3>

            <ul className="space-y-3 text-sm">
              {links.support.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer text-[#5C3D2E]/70 hover:text-[#5C3D2E] transition hover:translate-x-1"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL + CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-[#8B6914] mb-4 tracking-wider">
              Legal
            </h3>

            <ul className="space-y-3 text-sm mb-6">
              {links.legal.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer text-[#5C3D2E]/70 hover:text-[#5C3D2E] transition hover:translate-x-1"
                >
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="text-sm text-[#5C3D2E]/70 space-y-1">
              <p>📍 Kathmandu, Nepal</p>
              <p>📧 support@superdad.com</p>
              <p>📞 +977-98XXXXXXX</p>
            </div>
          </div>
        </div>

        {/* DIVIDER - Updated to match theme */}
        <div className="my-12 border-t border-[#E8D5B7]/50" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* COPYRIGHT */}
          <p className="text-xs text-[#5C3D2E]/60 text-center md:text-left">
            © {new Date().getFullYear()} Superdad. Made with love for modern parents 💖
          </p>

          {/* SOCIAL ICONS - Updated to match theme */}
          <div className="flex gap-4">
            {[
              {
                Icon: FaInstagram,
                link: "https://www.instagram.com/superdad0387/",
              },
              {
                Icon: FaFacebookF,
                link: "https://www.facebook.com/profile.php?id=61588601994404",
              },
              {
                Icon: FaTiktok,
                link: "https://www.tiktok.com/@super_dad0387",
              },
              {
                Icon: FaWhatsapp,
                link: "https://wa.me/your-number",
              },
            ].map(({ Icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-2 rounded-full bg-white/50 backdrop-blur-sm border border-[#E8D5B7] shadow-sm hover:shadow-md transition"
              >
                <Icon size={16} className="text-[#5C3D2E]" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* SOFT GLOW BOTTOM EDGE - Updated to match theme */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#E8D5B7]/20 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;