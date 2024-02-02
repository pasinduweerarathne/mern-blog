import images from "../../constants/images";
import { FiSearch } from "react-icons/fi";

const Home = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row justify-between max-w-[1280px] mx-auto">
      <div className="mt-10 w-full">
        <h1 className="font-roboto text-3xl lg:text-5xl font-bold text-dark-soft text-center lg:text-left">
          Read the most interesting articles
        </h1>
        <p className="text-center mx-auto max-w-lg lg:text-left lg:max-w-xl lg:mx-0">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam
          veniam eius quibusdam at, beatae possimus! Molestiae, explicabo.
        </p>
        <div className="flex flex-col gap-y-2.5 mt-10 lg:mt-6 relative max-w-lg mx-auto lg:mx-0">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#959EAD]" />
            <input
              className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-[#959EAD] rounded-lg pl-12 pr-3 w-full py-3 focus:outline-none shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] md:py-4"
              type="text"
              placeholder="Search article"
            />
          </div>
          <button className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
            Search
          </button>
        </div>
        <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7 items-center">
          <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="flex flex-wrap gap-x-2.5 gap-y-2.5 mt-3 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              Design
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              User Experience
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 text-primary font-semibold">
              User Interfaces
            </li>
          </ul>
        </div>
      </div>

      <img
        src={images.HeroImage}
        alt=""
        className="hidden md:block max-w-[540px] h-auto mx-auto lg:mx-0"
      />
    </section>
  );
};

export default Home;
