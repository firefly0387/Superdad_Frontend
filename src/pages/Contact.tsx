import ContactPageSkeleton from "@/components/skletons/ContactPageSkeleton";
import { Mail, Phone, MapPin, Send, Clock, Shield, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { submitContactForm } from "@/utils/api";
import type { ContactFormData } from "@/types/contact";
import SEO from "@/components/seo/seo";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Contact field validation - only if provided
    if (formData.contact && formData.contact.trim()) {
      const phoneNumber = formData.contact.replace(/[^0-9]/g, "");

      if (phoneNumber.length === 0) {
        newErrors.contact = "Please enter a valid phone number";
      } else if (phoneNumber.length < 10) {
        newErrors.contact = "Phone number must be at least 10 digits";
      } else if (phoneNumber.length > 15) {
        newErrors.contact = "Phone number must not exceed 15 digits";
      } else {
        const phoneNum = parseInt(phoneNumber);
        if (isNaN(phoneNum) || phoneNum > 2147483647) {
          newErrors.contact = "Phone number is too large";
        }
      }
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data for API
      let contactNumber = null;
      if (formData.contact && formData.contact.trim()) {
        const phoneNumber = formData.contact.replace(/[^0-9]/g, "");
        contactNumber = parseInt(phoneNumber);
      }

      const apiData: ContactFormData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        contact: formData.contact.trim(),
      };

      // Only add contact if it exists
      if (contactNumber) {
        apiData.contact = contactNumber;
      }

      const response = await submitContactForm(apiData);

      if (response.status !== "success") {
        toast.success("Message sent successfully! 🎉", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#5C3D2E",
            color: "#f5e7db",
            border: "1px solid #8B6914",
          },
        });
      } else {
        toast.error("Failed to send message. Please try again.", {
          duration: 3000,
          position: "top-right",
          style: {
            background: "#5C3D2E",
            color: "#f5e7db",
            border: "1px solid #8B6914",
          },
        });
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        contact: "",
        message: "",
      });
      setErrors({});
    } catch (error: any) {
      console.error("Contact form error:", error);

      let errorMessage = "Failed to send message. Please try again.";

      if (error.response?.data) {
        const errorData = error.response.data;

        // Handle field-specific errors
        if (typeof errorData === "object") {
          const fieldErrors: Record<string, string> = {};

          Object.keys(errorData).forEach((key) => {
            const errorValue = errorData[key];
            if (Array.isArray(errorValue) && errorValue.length > 0) {
              fieldErrors[key] = errorValue[0];
              if (key === "contact") {
                errorMessage = errorValue[0];
              }
            } else if (typeof errorValue === "string") {
              fieldErrors[key] = errorValue;
              errorMessage = errorValue;
            }
          });

          if (Object.keys(fieldErrors).length > 0) {
            setErrors(fieldErrors);
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#5C3D2E",
          color: "#f5e7db",
          border: "1px solid #8B6914",
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // For contact field, only allow numbers
    if (name === "contact") {
      const numbersOnly = value.replace(/[^0-9]/g, "").slice(0, 15); // Max 15 digits
      setFormData((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  if (loading) {
    return <ContactPageSkeleton />;
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with SuperDad for support, product inquiries, or feedback."
      />
      <section className="min-h-screen bg-[#f5e7db] py-16 md:py-20 pt-27.5 md:pt-30">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Top Intro */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5C3D2E]/10 text-[#5C3D2E] text-sm font-medium mb-5">
              <Mail size={14} />
              CONTACT US
              <Heart size={14} />
            </div>

            <h2 className="text-3xl md:text-4xl font-light text-[#3E2723] mb-4 tracking-tight">
              We're here to help{" "}
              <span className="font-semibold text-[#8B6914]">💬</span>
            </h2>

            <p className="text-[#795548] text-sm mt-4 leading-relaxed">
              Have a question or need support? Feel free to send us a message or
              email us anytime at{" "}
              <span className="text-[#8B6914] font-medium">
                support@superdad.com
              </span>
              .
            </p>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Clock size={14} className="text-[#795548]" />
              <p className="text-[#795548] text-xs">
                We usually reply within 1 working day · Mon – Fri, 8am – 5pm
              </p>
            </div>

            <div className="w-16 h-0.5 bg-[#D4C4A8] mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5C3D2E]/10 flex items-center justify-center group-hover:bg-[#5C3D2E]/20 transition">
                    <Mail className="w-5 h-5 text-[#5C3D2E]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#795548] uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-sm font-medium text-[#3E2723]">
                      support@superdad.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5C3D2E]/10 flex items-center justify-center group-hover:bg-[#5C3D2E]/20 transition">
                    <Phone className="w-5 h-5 text-[#5C3D2E]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#795548] uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-sm font-medium text-[#3E2723]">
                      +977-98XXXXXXX
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 hover:shadow-md transition-all duration-300 group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#5C3D2E]/10 flex items-center justify-center group-hover:bg-[#5C3D2E]/20 transition">
                    <MapPin className="w-5 h-5 text-[#5C3D2E]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#795548] uppercase tracking-wide">
                      Address
                    </p>
                    <p className="text-sm font-medium text-[#3E2723]">
                      Kathmandu, Nepal
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-[#5C3D2E]/5 rounded-2xl border border-[#E8D5B7] p-6 text-center">
                <Shield className="w-8 h-8 text-[#8B6914] mx-auto mb-2" />
                <p className="text-xs text-[#795548]">
                  Your information is safe with us
                </p>
                <p className="text-xs text-[#795548] mt-1">
                  We never share your data with third parties
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6 md:p-8 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-[#3E2723] mb-6">
                Send us a message
              </h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.name ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 text-[#3E2723] placeholder:text-[#795548]/50 focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 outline-none transition`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 text-[#3E2723] placeholder:text-[#795548]/50 focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 outline-none transition`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Contact Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="9841234567"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.contact ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 text-[#3E2723] placeholder:text-[#795548]/50 focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 outline-none transition`}
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.contact}
                    </p>
                  )}
                  <p className="text-xs text-[#795548] mt-1">
                    Enter 10-15 digit mobile number (e.g., 9841234567)
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#3E2723] mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.message ? "border-red-500" : "border-[#E8D5B7]"
                    } bg-white/50 text-[#3E2723] placeholder:text-[#795548]/50 focus:border-[#8B6914] focus:ring-2 focus:ring-[#8B6914]/20 outline-none transition resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-[#5C3D2E] text-white rounded-xl font-medium hover:bg-[#4A3226] transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Map Section */}
          <div className="max-w-5xl mx-auto mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-[#E8D5B7] p-6">
              <h3 className="text-lg font-semibold text-[#3E2723] mb-4 text-center">
                Find Us
              </h3>
              <div className="rounded-xl overflow-hidden h-64 bg-[#D4C4A8]/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d624.4173296229931!2d85.3401695178302!3d27.709942418162544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19006e6b8901%3A0xe6ca12faf4f47e06!2sKalpana%20Griha%20(Dr.%20Archan%3A%20Syringe%20Symbol)!5e0!3m2!1sen!2snp!4v1779868739542!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl"
                  title="Store Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
