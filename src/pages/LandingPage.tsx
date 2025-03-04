import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LandingLayout from "@/components/layouts/LandingLayout";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <LandingLayout>
      <h1 className="text-5xl font-bold my-6">PetMatch</h1>
      <div className="flex flex-row gap-4">
        <Link to="/signup">
          <Button className="my-12">Crie uma conta</Button>
        </Link>
        <Link to="/about">
          <Button
            variant="outline"
            className="my-12"
          >
            Saiba mais
          </Button>
        </Link>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-4/5"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>O que é o PetMatch?</AccordionTrigger>
          <AccordionContent>
            PetMatch é uma plataforma que conecta abrigos de animais e adotantes
            em potencial, facilitando o processo de adoção responsável.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Como adotar um pet?</AccordionTrigger>
          <AccordionContent>
            Para adotar um pet, você precisa se cadastrar na plataforma,
            procurar por pets disponíveis e entrar em contato com os abrigos ou
            responsáveis pela adoção.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Como funciona a plataforma?</AccordionTrigger>
          <AccordionContent>
            A plataforma permite que abrigos de animais publiquem informações
            sobre pets para adoção. Os usuários podem pesquisar por pets com
            base em filtros como idade, raça e localização, facilitando a
            escolha do pet ideal.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            Como um abrigo pode participar do PetMatch?
          </AccordionTrigger>
          <AccordionContent>
            Se você é um abrigo, pode se cadastrar facilmente na plataforma para
            listar os animais disponíveis para adoção. Com isso, você terá a
            oportunidade de apresentar seus pets para uma comunidade de
            adotantes em potencial, facilitando o processo de adoção e ajudando
            mais animais a encontrarem um novo lar.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Ainda precisa de ajuda?</AccordionTrigger>
          <AccordionContent>
            Se você tiver dúvidas ou precisar de ajuda, entre em contato conosco
            através da nossa{" "}
            <Link
              to="/contact"
              className="font-semibold underline"
            >
              página de suporte
            </Link>{" "}
            ou envie uma mensagem para nosso e-mail. Estamos sempre prontos para
            ajudar.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </LandingLayout>
  );
};

export default LandingPage;
