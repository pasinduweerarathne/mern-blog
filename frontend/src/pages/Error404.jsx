import { Link } from "react-router-dom";
import images from "@/constants/images";
import { FaArrowLeft } from "react-icons/fa";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center mt-[50px]">
      <div className="">
        <img
          src={images.PageNotFound}
          alt="PageNotFound"
          className="max-h-[400px] w-auto"
        />
      </div>

      <Link
        to="/"
        className="bg-red-500 px-6 py-2 rounded-full font-bold text-white flex items-center gap-2 transition-all duration-300 hover:bg-red-600 w-max"
      >
        <FaArrowLeft />
        Go Back To Home Page
      </Link>
    </div>
  );
};

export default Error404;
