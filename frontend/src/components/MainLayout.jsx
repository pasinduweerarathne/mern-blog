/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="font-opensans">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
