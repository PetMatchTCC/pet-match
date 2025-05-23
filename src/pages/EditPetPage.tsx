import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/fireConfig";
import { ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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
      sex: undefined
    }
  })

  const { petId } = useParams();

  const { user } = useAuth();
  const uid = user?.uid;

  const navigate = useNavigate();

  const petRef = ref(db, `users/${uid}/pets/${petId}`);

  const [petData, setPetData] = useState<PetInterface>();

  const { handleSubmit, control, reset } = form;

  useEffect(() => {

  }, [petId]);

  const sexoOptions = [
    { value: "M", label: "Macho" },
    { value: "F", label: "Fêmea" },
  ];

  const especieOptions = [
    { value: "dog", label: "Cachorro" },
    { value: "cat", label: "Gato" },
    { value: "non", label: "Outra" },
  ];

  return (
    <MainLayout>
      <Card>
        <CardTitle>
          <h1>Editando pet</h1>
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form>
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

              <Button
                type="submit"
                className="w-full my-4"
              >
                Cadastrar Pet
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </MainLayout>
  )
}

export default EditPetPage;
