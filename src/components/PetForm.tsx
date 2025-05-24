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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PetInterface } from "@/types/petTypes";

const especieOptions = [
  { value: "dog", label: "Cachorro" },
  { value: "cat", label: "Gato" },
  { value: "non", label: "Outra" },
];

const sexoOptions = [
  { value: "M", label: "Macho" },
  { value: "F", label: "Fêmea" },
];

const PetForm = () => {
  const form = useForm<PetInterface>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      age: undefined,
      specie: undefined,
      sex: undefined,
    },
  });

  const { handleSubmit, control, reset } = form;
  const { user } = useAuth();

  const onSubmit = (data: PetInterface) => {
    if (!user?.uid) {
      alert("Usuário não autenticado.");
      return;
    }

    const petData: PetInterface = {
      ...data,
      name: data.name,
      specie: data.specie,
      sex: data.sex,
      date: new Date().toDateString(),
      age: data.age ? Number(data.age) : undefined,
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
          name="name"
          rules={{ required: "Nome é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Nome*</FormLabel>
              <FormControl>
                <Input
                  id="name"
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
          name="age"
          rules={{
            required: "Idade é obrigatória",
            pattern: {
              value: /^\d+$/,
              message: "Idade deve conter apenas números",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="age">Idade*</FormLabel>
              <FormControl>
                <Input
                  id="age"
                  placeholder="Digite a idade do pet"
                  type="number"
                  min={0}
                  {...field}
                  // Garante que o valor seja string para o RHF, mas aceita undefined
                  value={field.value === undefined ? "" : field.value}
                  onChange={(e) => {
                    // Permite vazio para resetar, ou número
                    const val = e.target.value;
                    field.onChange(val === "" ? undefined : val);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="specie"
          rules={{ required: "Espécie é obrigatória" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="specie">Espécie*</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={field.disabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    {especieOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="sex"
          rules={{ required: "Sexo é obrigatório" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="sex">Sexo*</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                  disabled={field.disabled}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o sexo" />
                  </SelectTrigger>
                  <SelectContent>
                    {sexoOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
