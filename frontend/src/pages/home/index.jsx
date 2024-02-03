import Articles from "./Articles";
import CTA from "./CTA";
import HeroSection from "./HeroSection";

const Home = () => {
  return (
    <>
      <div className="px-4">
        <HeroSection />
        <Articles />
      </div>
      <CTA />
    </>
  );
};

export default Home;
