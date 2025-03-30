import PawLoader from "@/components/custom/PawLoader";
import LandingLayout from "@/components/layouts/LandingLayout";

const AboutPage = () => {
  return (
    <LandingLayout>
      <h1 className="text-4xl font-bold my-4">Sobre nós</h1>
      <PawLoader />
    </LandingLayout>
  );
};

export default AboutPage;
