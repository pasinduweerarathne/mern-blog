/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="font-opensans flex flex-col min-h-screen px-4">
      <Header />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
