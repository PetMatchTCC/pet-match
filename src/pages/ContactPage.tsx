import LandingLayout from "@/components/layouts/LandingLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactPage = () => {
  return (
    <LandingLayout>
      <h1 className="text-4xl font-bold my-4">Contato</h1>
      <Card className="w-2/3 mx-auto my-4 shadow-lg">
        <CardHeader>
          <CardTitle>Fale Conosco</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo para entrar em contato.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block font-medium"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded-md"
                placeholder="Seu nome"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md"
                placeholder="Seu e-mail"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-medium"
              >
                Mensagem
              </label>
              <textarea
                id="message"
                className="w-full p-2 border rounded-md"
                placeholder="Sua mensagem"
                rows={4}
              />
            </div>
          </form>
        </CardContent>

        <CardFooter>
          <Button className="w-full p-2 text-white rounded-md">Enviar</Button>
        </CardFooter>
      </Card>
    </LandingLayout>
  );
};

export default ContactPage;
