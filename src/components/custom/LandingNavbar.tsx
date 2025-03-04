import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { ChevronUp, Menu } from "lucide-react";

const LandingNavbar = () => {
  const linkList = [
    {
      text: "Início",
      path: "/home",
    },
    {
      text: "Sobre nós",
      path: "/about",
    },
    {
      text: "Contato",
      path: "/contact",
    },
  ];

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 680);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 680);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="bg-white shadow-md py-4">
      <nav className="max-w-7xl mx-auto px-6 flex justify-start items-center">
        <Link
          to="/home"
          className="text-2xl font-bold text-gray-800 flex flex-row gap-2"
        >
          <img
            src={"paw.svg"}
            alt="PetMatch logo"
            className="size-8"
          />
          PetMatch
        </Link>

        {isMobile ? (
          <button
            className="ml-auto text-gray-800 focus:outline-none"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <ChevronUp size={28} /> : <Menu size={28} />}
          </button>
        ) : (
          <>
            <ul className="flex gap-1 ml-8">
              {linkList.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>
                    <Button
                      variant="ghost"
                      className="text-gray-600 transition-colors font-semibold"
                    >
                      {link.text}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="ml-auto">
              <Link to="/login">
                <Button className="mr-2">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline">Cadastro</Button>
              </Link>
            </div>
          </>
        )}

        {isMobile && isMenuOpen && (
          <div className="bg-white shadow-md p-4 absolute top-16 left-0 w-full flex flex-col items-center space-y-4">
            {linkList.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                <Button
                  variant="ghost"
                  className="text-gray-600 font-semibold w-full"
                >
                  {link.text}
                </Button>
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full"
            >
              <Button className="w-full">Login</Button>
            </Link>
            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full"
            >
              <Button
                variant="outline"
                className="w-full"
              >
                Cadastro
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default LandingNavbar;
