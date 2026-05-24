import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/footer/Footer";
import TopBar from "@/components/topbar/Topbar";

const MainLayout = () => {
  return (
     <div className="min-h-screen bg-linear-to-b from-[#fff7fb] via-white to-[#f7fbff] text-gray-900">
    <>
   <header className="sticky top-0 z-70">
  <TopBar />
  <Navbar />
</header>
      <main className="overflow-hidden">
        <Outlet/>
      </main>
      <Footer/>
    </>

    </div>
  );
};

export default MainLayout;