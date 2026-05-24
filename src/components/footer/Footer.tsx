import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
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
      { name: "FAQ", path: "/faq" },
      { name: "Shipping Policy", path: "/shipping-policy" },
      { name: "Refund Policy", path: "/refund-policy" },
      { name: "Payment Policy", path: "/payment-policy" },
    ],
    legal: [
      { name: "Terms & Conditions", path: "/terms-and-conditions" },
    ],
  };

  return (
    <footer className="relative overflow-hidden bg-linear-to-b from-[#fff7fb] via-white to-[#f7fbff] border-t border-white/40">
      

      {/* SOFT FLOATING BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-pink-200/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"
        />

        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200/10 rounded-full blur-3xl"
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              Superdad
              <span className="text-pink-400">❤</span>
            </h2>

            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              A modern parenting platform for baby essentials, kids products,
              and family-first shopping experiences.
              <br /><br />
              Built to support both mothers and fathers equally in their parenting journey.
            </p>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-600 mb-4">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
              {links.company.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer hover:text-black transition hover:translate-x-1"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-600 mb-4">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-gray-500">
              {links.support.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer hover:text-black transition hover:translate-x-1"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL + CONTACT */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-600 mb-4">
              Legal
            </h3>

            <ul className="space-y-3 text-sm text-gray-500 mb-6">
              {links.legal.map((item, i) => (
                <li
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="cursor-pointer hover:text-black transition hover:translate-x-1"
                >
                  {item.name}
                </li>
              ))}
            </ul>

            <div className="text-sm text-gray-500 space-y-1">
              <p>📍 Kathmandu, Nepal</p>
              <p>📧 support@superdad.com</p>
              <p>📞 +977-98XXXXXXX</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-12 border-t border-white/50" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* COPYRIGHT */}
          <p className="text-xs text-gray-400 text-center md:text-left">
            © {new Date().getFullYear()} Superdad. Made with love for modern parents 💖
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4">
            {[
              {
                Icon: FaInstagram,
                link: "https://www.instagram.com/superdad0387/",
              },
              {
                Icon: FaFacebookF,
                link: "https://facebook.com/YOUR_PAGE",
              },
              {
                Icon: FaTiktok,
                link: "https://www.tiktok.com/@super_dad0387",
              },
            ].map(({ Icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-2 rounded-full bg-white/40 backdrop-blur-xl border border-white/30 shadow-sm hover:shadow-md transition"
              >
                <Icon size={16} className="text-gray-600" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* SOFT GLOW BOTTOM EDGE */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-pink-100/30 to-transparent pointer-events-none" />
    </footer>
  );
};

export default Footer;