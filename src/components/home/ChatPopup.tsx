// components/ChatPopup.tsx
import { useState, useEffect } from "react";
import { MessageCircle, X, Send, MessageSquare } from "lucide-react";
import { FaFacebook } from "react-icons/fa";

interface ChatPopupProps {
  // WhatsApp configuration
  whatsappNumber?: string; // Format: "1234567890" (no + or spaces)
  whatsappMessage?: string; // Pre-filled message
  // Messenger configuration
  messengerPageId?: string; // Facebook page ID or username
  // Appearance
  position?: "bottom-right" | "bottom-left";
  theme?: "light" | "dark";
  autoOpenDelay?: number; // Auto open popup after X seconds (0 = disabled)
}

const ChatPopup = ({
  whatsappNumber = "",
  whatsappMessage = "Hi! I have a question about your products.",
  messengerPageId = "",
  position = "bottom-right",
  theme = "light",
  autoOpenDelay = 0,
}: ChatPopupProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto open popup after delay
  useEffect(() => {
    if (autoOpenDelay > 0 && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowTooltip(false);
      }, autoOpenDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [autoOpenDelay, isOpen]);

  // Hide tooltip after 5 seconds
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => setShowTooltip(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  const getPositionClasses = () => {
    return position === "bottom-right" ? "right-4 bottom-4" : "left-4 bottom-4";
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(url, "_blank");
  };

  const handleMessenger = () => {
    const url = `https://m.me/${messengerPageId}`;
    window.open(url, "_blank");
  };

  const getThemeClasses = () => {
    return theme === "light"
      ? "bg-white text-gray-800 border-gray-200"
      : "bg-gray-800 text-white border-gray-700";
  };

  return (
    <>
      {/* Chat Button */}
      <div className={`fixed ${getPositionClasses()} z-50`}>
        {/* Tooltip */}
        {showTooltip && !isOpen && (
          <div className="absolute bottom-16 right-0 animate-bounce-in">
            <div className="relative bg-[#5C3D2E] text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
              <p className="text-sm font-medium">Need help? Chat with us! 💬</p>
              <div className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-[#5C3D2E]"></div>
            </div>
          </div>
        )}

        {/* Popup Window */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-80 sm:w-96 animate-slide-in-up">
            <div
              className={`rounded-2xl shadow-2xl overflow-hidden border ${getThemeClasses()}`}
            >
              {/* Header */}
              <div className="bg-[#5C3D2E] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Customer Support</h3>
                    <p className="text-xs text-white/80">We typically reply within minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="hover:bg-white/20 p-1 rounded transition-colors"
                  >
                    {isMinimized ? "□" : "−"}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-white/20 p-1 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Content */}
              {!isMinimized && (
                <div className="p-4 space-y-4">
                  <p className="text-sm text-center opacity-80">
                    Choose your preferred way to connect with us
                  </p>

                  {/* WhatsApp Button */}
                  {whatsappNumber && (
                    <button
                      onClick={handleWhatsApp}
                      className="w-full flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 text-green-700 transition-all transform hover:scale-105 active:scale-95 group"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">WhatsApp</p>
                        <p className="text-xs opacity-75">Get quick replies on WhatsApp</p>
                      </div>
                      <Send className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}

                  {/* Messenger Button */}
                  {messengerPageId && (
                    <button
                      onClick={handleMessenger}
                      className="w-full flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-all transform hover:scale-105 active:scale-95 group"
                    >
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaFacebook className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold">Messenger</p>
                        <p className="text-xs opacity-75">Chat with us on Facebook Messenger</p>
                      </div>
                      <Send className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>
                  )}

                  {/* Online Status */}
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs opacity-60">Online • Typically replies instantly</p>
                  </div>

                  {/* Operating Hours */}
                  <div className="text-center text-xs opacity-50 pt-2">
                    <p>Mon - Fri: 9:00 AM - 8:00 PM</p>
                    <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Chat Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="w-14 h-14 bg-[#5C3D2E] text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center group relative"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              {/* Notification Badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center animate-pulse">
                1
              </span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default ChatPopup;