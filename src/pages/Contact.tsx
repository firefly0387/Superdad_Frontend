
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <section className="w-full px-6 md:px-20 py-20 ">

      {/* Top Intro */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-xs tracking-widest text-gray-400 mb-2">
          CONTACT
        </p>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          We’re here to help 💬
        </h2>

        <p className="text-gray-500 text-sm mt-4 leading-relaxed">
          Have a question or need support? Feel free to send us a message 
          or email us anytime at{" "}
          <span className="text-black font-medium">
            support@superdad.com
          </span>.
        </p>

        <p className="text-gray-400 text-xs mt-4">
          We usually reply within 1 working day · Mon – Fri, 8am – 5pm
        </p>

        <div className="w-16 h-0.5 bg-black/10 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Contact Info */}
        <div className="flex flex-col justify-center gap-6">

          <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow transition">
            <Mail />
            <span className="text-sm">support@superdad.com</span>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow transition">
            <Phone />
            <span className="text-sm">+977-98XXXXXXX</span>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow transition">
            <MapPin />
            <span className="text-sm">Kathmandu, Nepal</span>
          </div>

        </div>

        {/* Contact Form */}
        <form className="bg-white p-8 rounded-2xl shadow-sm border space-y-6">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black/20 transition"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black/20 transition"
          />

          <input
            type="tel"
            placeholder="Contact Number"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black/20 transition"
          />

          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-black/20 resize-none transition"
          ></textarea>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-full hover:scale-[1.02] hover:bg-gray-800 transition"
          >
            Send Message →
          </button>

        </form>
      </div>

    </section>
  );
};

export default ContactPage;