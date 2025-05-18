import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { ref, push } from "firebase/database";
import { db } from "@/firebase/fireConfig";
import { useAuth } from "@/contexts/AuthContext";

type PetFormData = {
  nome: string;
  idade: string;
  especie: string;
  sexo: string;
};

export function PetForm() {
  const form = useForm<PetFormData>({
    mode: "onTouched",
    defaultValues: {
      nome: "",
      idade: "",
      especie: "",
      sexo: "",
    },
  });

  const { handleSubmit, formState: { errors }, control, reset } = form;
  const { user } = useAuth();

  const onSubmit = (data: PetFormData) => {
    if (!user?.uid) {
      alert("Usuário não autenticado.");
      return;
    }

    const petData = {
      ...data,
      idade: Number(data.idade), // converte idade para número
    };

    const petRef = ref(db, `users/${user.uid}/pets`);

    push(petRef, petData)
      .then(() => {
        alert("Pet cadastrado com sucesso!");
        reset(); // limpa o formulário
      })
      .catch((error) => {
        console.error("Erro ao salvar pet:", error);
        alert("Erro ao salvar pet.");
      });
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto p-4">
        <FormField
          name="nome"
          control={control}
          rules={{ required: "Nome é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome do pet" {...field} />
              </FormControl>
              <FormMessage>{errors.nome?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="idade"
          control={control}
          rules={{
            required: "Idade é obrigatória",
            pattern: {
              value: /^\d+$/,
              message: "Idade deve conter apenas números",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Idade</FormLabel>
              <FormControl>
                <Input placeholder="Digite a idade do pet" {...field} />
              </FormControl>
              <FormMessage>{errors.idade?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="especie"
          control={control}
          rules={{ required: "Espécie é obrigatória" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Espécie</FormLabel>
              <FormControl>
                <Input placeholder="Ex: cão, gato" {...field} />
              </FormControl>
              <FormMessage>{errors.especie?.message}</FormMessage>
            </FormItem>
          )}
        />

        <FormField
          name="sexo"
          control={control}
          rules={{ required: "Sexo é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <Input placeholder="Macho ou Fêmea" {...field} />
              </FormControl>
              <FormMessage>{errors.sexo?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Cadastrar Pet</Button>
      </form>
    </Form>
  );
}
