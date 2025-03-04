import { ReactNode } from "react";
import LandingNavbar from "../custom/LandingNavbar";

interface LandingLayoutProps {
  children: ReactNode;
}

const LandingLayout = ({ children }: LandingLayoutProps) => {
  return (
    <>
      <LandingNavbar />
      <div className="items-center justify-center w-full flex flex-col p-6l">
        {children}
      </div>
    </>
  );
};

export default LandingLayout;
