// MainLayout.tsx
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ChatPopup from "@/components/home/ChatPopup";

const MainLayout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.clientHeight);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5e7db]">
      <div ref={headerRef}>
        <Header />
      </div>
      
      {!isHomePage && headerHeight > 0 && (
        <div style={{ height: `${headerHeight}px` }} />
      )}
      
      <main>
        <Outlet />
      </main>
      
      <Footer />
      
      {/* Chat Popup - Only appears when clicked */}
      <ChatPopup
        whatsappNumber="9771234567890" // Replace with your WhatsApp number
        whatsappMessage="Hi! I need help with your products."
        messengerPageId="your_page_username" // Replace with your Facebook page username
        position="bottom-right"
        theme="light"
      />
    </div>
  );
};

export default MainLayout;