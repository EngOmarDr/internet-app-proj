import Hero from "../components/home/Hero";
import SourceSafePlan from "../components/home/SourceSafePlane";

const HomePage = () => {
  return (
    <section>
        <Hero/>
      <h2 className="text-center mt-10 text-3xl font-bold">
        Choose Your Source Safe Plan
      </h2>
      <div className="container m-auto flex justify-center items-center my-7 flex-wrap md:gap-7">
        <SourceSafePlan/>
        <SourceSafePlan/>
        <SourceSafePlan/>
      </div>
    </section>
  );
};

export default HomePage;
