/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="font-opensans flex flex-col max-w-[1280px] mx-auto">
      <Header />
      <div className="grow min-h-[calc(100vh-56px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
