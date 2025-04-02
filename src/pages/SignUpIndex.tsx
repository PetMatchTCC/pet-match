import LandingLayout from "@/components/layouts/LandingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpIndex = () => {

  const content = [
    { title: "Adotante", path: "/adopter", component: HeartHandshake },
    { title: "Abrigo", path: "/shelter", component: Warehouse }
  ];

  return (
    <LandingLayout>
      <h1 className="text-4xl font-bold text-orange-600">Cadastro</h1>
      <span className="text-center font">Para começar, você é: </span>
      <div className="flex flex-row flex-wrap gap-4 my-6">
        {
          content.map((item) => {
            return (
              <Link to={item.path}>

                <Card className="min-w-64 h-72 p-4 cursor-pointer hover:scale-105 transition-all">
                  <CardTitle className="text-center text-2xl font-semibold">{item.title}</CardTitle>
                  <CardContent className="aspect-square flex flex-col items-center justify-center hover:text-orange-500 text-zinc-800">
                    <item.component size={84} className="my-auto" />
                    <Button variant={"outline"} className="p-2 text-base">
                      Criar conta
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })

        }
      </div>
    </LandingLayout>
  );
}

export default SignUpIndex;