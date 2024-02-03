import { BsCheckLg } from "react-icons/bs";
import images from "../constants/images";
import { Link } from "react-router-dom";

const ArticleCard = () => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] max-w-[350px]`}
    >
      <Link to={``}>
        <img src={images.post1} alt="title" className="w-full" />
      </Link>
      <div className="p-5">
        <Link to={``}>
          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
            Lorem ipsum dolor sit.
          </h2>
          <p className="text-dark-light mt-3 text-sm md:text-lg">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem,
            rerum.
          </p>
        </Link>
        <div className="flex justify-between flex-nowrap items-center mt-6">
          <div className="flex items-center gap-x-2 md:gap-x-2.5">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-black" />
            <div className="flex flex-col">
              <h4 className="font-bold italic text-dark-soft text-sm md:text-base">
                John Paul
              </h4>
              <div className="flex items-center gap-x-2">
                <span
                  className={`
                    bg-[#36B37E] w-fit bg-opacity-20 p-1 rounded-full`}
                >
                  <BsCheckLg className="text-md text-[#36B37E]" />
                </span>
                <span className="italic text-dark-light text-xs md:text-sm">
                  verified writer
                </span>
              </div>
            </div>
          </div>
          <span className="font-bold text-dark-light italic text-sm md:text-base">
            {/* {new Date(post.createdAt).getDate()}{" "}
            {new Date(post.createdAt).toLocaleString("default", {
              month: "long",
            })} */}
            May 02
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
