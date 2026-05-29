import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";

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
      
      {/* Remove overflow-hidden */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;