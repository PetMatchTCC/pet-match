import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ref, push } from "firebase/database";
import { db } from "@/firebase/fireConfig";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PawPrint } from "lucide-react";

type PetFormData = {
  nome: string;
  idade: string;
  especie: string;
  sexo: string;
};

const PetForm = () => {
  const form = useForm<PetFormData>({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      idade: "",
      especie: "",
      sexo: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;
  const { user } = useAuth();

  const onSubmit = (data: PetFormData) => {
    if (!user?.uid) {
      alert("Usuário não autenticado.");
      return;
    }

    const petData = {
      ...data,
      idade: Number(data.idade),
    };

    const petRef = ref(db, `users/${user.uid}/pets`);

    push(petRef, petData)
      .then(() => {
        alert("Pet cadastrado com sucesso!");
        reset();
      })
      .catch((error) => {
        console.error("Erro ao salvar pet:", error);
        alert("Erro ao salvar pet.");
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto p-4 w-full"
      >
        <FormField
          control={control}
          name="nome"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="nome">Nome*</FormLabel>
              <FormControl>
                <Input
                  id="nome"
                  placeholder="Digite o nome do pet"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="idade"
          rules={{
            required: "Idade é obrigatória",
            pattern: {
              value: /^\d+$/,
              message: "Idade deve conter apenas números",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="idade">Idade*</FormLabel>
              <FormControl>
                <Input
                  id="idade"
                  placeholder="Digite a idade do pet"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="especie"
          rules={{ required: "Espécie é obrigatória" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="especie">Espécie*</FormLabel>
              <FormControl>
                <Input
                  id="especie"
                  placeholder="Ex: cão, gato"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="sexo"
          rules={{ required: "Sexo é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="sexo">Sexo*</FormLabel>
              <FormControl>
                <Input
                  id="sexo"
                  placeholder="Macho ou Fêmea"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-4" />

        <Button
          type="submit"
          className="w-full my-4"
        >
          Cadastrar Pet
        </Button>
      </form>
    </Form>
  );
};

export default PetForm;
