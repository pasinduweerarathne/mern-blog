import Articles from "./Articles";
import CTA from "./CTA";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <HeroSection />
      <Articles />
      <CTA />
    </div>
  );
};

export default Home;
