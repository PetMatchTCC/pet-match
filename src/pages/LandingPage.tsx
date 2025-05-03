import { Button } from "@/components/ui/button";
import LandingLayout from "@/components/layouts/LandingLayout";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <LandingLayout>
      <main className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-[3] flex items-center justify-center">
          <img
            src="/landing.svg"
            alt="Landing Image"
            className="h-auto md:w-[40vw] w-[90vw]"
          />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 h-full">
          <h1 className="text-5xl text-center font-bold my-2 text-primary">
            PetMatch
          </h1>
          <h2 className="text-1xl text-center font-semibold mb-2 text-neutral-600">
            A rede social para encontrar seu futuro pet
          </h2>
          <div className="flex-row gap-2 flex">
            <Link to="/signup">
              <Button className="my-4 md:my-12">Crie uma conta</Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="my-4 md:my-12"
              >
                Saiba mais
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </LandingLayout>
  );
};

export default LandingPage;
