/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="font-opensans flex flex-col max-w-[1280px] mx-auto">
      <Header />
      <div className="flex-grow min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
