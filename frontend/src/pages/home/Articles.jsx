import { FaArrowRight } from "react-icons/fa";
import ArticleCard from "@/components/ArticleCard";

const Articles = () => {
  return (
    <section className="">
      <div className="mt-10 gap-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center pb-10">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>

      <button className="flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg mx-auto transition-all duration-500 hover:bg-primary hover:text-white">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;
