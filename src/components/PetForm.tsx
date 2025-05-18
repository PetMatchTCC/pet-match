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
import { getDatabase, ref, push } from "firebase/database";
import { useAuth } from "@/contexts/AuthContext";

type PetFormData = {
  nome: string;
  idade: string;
  especie: string;
  sexo: string;
};

export function PetForm() {
  const form = useForm<PetFormData>();
  const { register, handleSubmit, formState: { errors } } = form;
  const { user } = useAuth();
  const db = getDatabase();

  const onSubmit = (data: PetFormData) => {
    if (!user?.uid) {
      alert("Usuário não autenticado.");
      return;
    }

    const petRef = ref(db, `users/${user.uid}/pets`);
    push(petRef, data)
      .then(() => alert("Pet cadastrado com sucesso!"))
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
