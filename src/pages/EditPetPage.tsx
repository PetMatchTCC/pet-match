import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/fireConfig";
import { get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";

interface PetInterface {
  name: string;
  sex: string;
  specie: string;
  age: number;
}

const EditPetPage = () => {
  const form = useForm<PetInterface>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      age: undefined,
      specie: undefined,
      sex: undefined,
    },
  });

  const { petId } = useParams();

  const { user } = useAuth();
  const uid = user?.uid;

  const navigate = useNavigate();

  const { handleSubmit, control, reset } = form;

  useEffect(() => {
    // evita a exibição para usuários não logados
    if (!uid) navigate("/login");
    if (!petId) navigate("/me");

    const fetchPet = async () => {
      const petRef = ref(db, `users/${uid}/pets/${petId}`);
      const snapshot = await get(petRef);
      if (snapshot.exists()) {
        const pet = snapshot.val();
        reset(pet);
      }
    };
    fetchPet();
  }, [petId, uid, reset]);

  const sexoOptions = [
    { value: "M", label: "Macho" },
    { value: "F", label: "Fêmea" },
  ];

  const especieOptions = [
    { value: "dog", label: "Cachorro" },
    { value: "cat", label: "Gato" },
    { value: "non", label: "Outra" },
  ];

  const onSubmit = async (data: PetInterface) => {
    if (!uid || !petId) return;

    const petRef = ref(db, `users/${uid}/pets/${petId}`);

    await update(petRef, data);
    navigate("/me");
  };

  return (
    <MainLayout>
      <div className="flex flex-col w-full justify-center items-center">
        <Card className="m-4 w-full max-w-screen-md">
          <CardTitle className="flex flex-row gap-2 items-center justify-center">
            <Edit3 className="text-orange-500" />
            <h1 className="text-center font-bold text-orange-500 my-4">
              Editando pet
            </h1>
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                          value={field.value === undefined ? "" : field.value}
                          onChange={(e) => {
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

                <div className="flex flex-row gap-2">
                  <Button
                    variant={"outline"}
                    className="w-full my-4"
                    onClick={() => navigate("/me")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="w-full my-4"
                  >
                    Salvar alterações
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditPetPage;
