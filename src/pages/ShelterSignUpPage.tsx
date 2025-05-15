import LandingLayout from "@/components/layouts/LandingLayout.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { doCreateUserWithEmailAndPassword } from "@/firebase/fireAuth";
import { useNavigate } from "react-router-dom";
import { ShelterAuthFormValues } from "@/types/authTypes";
import { Separator } from "@/components/ui/separator";
import InputMask from "react-input-mask";
import { UserRoundPlus } from "lucide-react";

const ShelterSignUpPage = () => {
  const navigate = useNavigate();
  const form = useForm<ShelterAuthFormValues>({
    defaultValues: {
      username: "",
      email: "",
      cnpj: "",
      password: "",
      repass: "",
      address: "",
      phone: "",
    },
  });

  const validateCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj.length !== 14) return false;

    if (/^(\d)\1+$/.test(cnpj)) return false;

    let size = 12;
    let numbers = cnpj.substring(0, size);
    const digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  };

  const onSubmit = async (data: { username: string; password: string }) => {
    await doCreateUserWithEmailAndPassword(data.username, data.password);
    navigate("/feed");
  };

  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return (
    <LandingLayout>
      <Card className="flex justify-center flex-col w-[95%] max-w-[600px] my-8 p-2">
        <CardTitle className="flex items-center justify-center text-primary gap-1">
          <UserRoundPlus size={28} />
          <h1 className="text-3xl font-bold text-center my-6">
            Cadastro de abrigo
          </h1>
        </CardTitle>
        <CardContent className="flex justify-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex justify-center"
            >
              <div className="space-y-6 w-full max-w-md">
                <FormField
                  control={form.control}
                  name="username"
                  rules={{
                    required: "Por favor, informe o nome do abrigo",
                    minLength: {
                      value: 3,
                      message: "Esse nome é muito curto",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">Nome do abrigo*</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Qual o nome do seu abrigo?"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  rules={{
                    required: "É necessário um e-mail para criar a conta",
                    pattern: {
                      value: emailRegex,
                      message: "E-mail em formato inválido",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">E-mail*</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Digite seu e-mail"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cnpj"
                  rules={{
                    required: "É obrigatório informar o CNPJ",
                    validate: (value) =>
                      validateCNPJ(value) || "O CNPJ é inválido",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cnpj">CNPJ*</FormLabel>
                      <FormControl>
                        <InputMask
                          mask="99.999.999/9999-99"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        >
                          {(inputProps: any) => (
                            <Input
                              {...inputProps}
                              id="cnpj"
                              placeholder="__.___.___/____-__"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              ref={field.ref}
                            />
                          )}
                        </InputMask>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <Separator className="my-4" />
                <FormField
                  control={form.control}
                  name="address"
                  rules={{
                    required: "É obrigatório informar o endereço",
                    minLength: {
                      value: 5,
                      message: "O endereço é muito curto",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">
                        Endereço do abrigo*
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="address"
                          type="text"
                          placeholder="Rua tal, Cidade, UF. BRASIL."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone">Telefone</FormLabel>
                      <FormControl>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        >
                          {(inputProps: any) => (
                            <Input
                              {...inputProps}
                              id="phone"
                              placeholder="(11) 91234-5678"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                              ref={field.ref}
                            />
                          )}
                        </InputMask>
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <Separator className="my-4" />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Escolha uma senha",
                    minLength: {
                      value: 8,
                      message: "Sua senha é muito curta",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Senha*</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="Crie uma senha"
                          type="password"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="repass"
                  rules={{
                    required: "Por favor, preencha novamente a senha",
                    validate: (value) =>
                      value === form.getValues("password") ||
                      "As senhas não coincidem",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="repass">Repita a senha*</FormLabel>
                      <FormControl>
                        <Input
                          id="repass"
                          placeholder="Repita sua senha"
                          type="password"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full my-8 p-3 bg-orange-400 text-white rounded-lg hover:bg-orange-700 focus:ring-4 focus:ring-blue-300"
                >
                  Criar conta
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </LandingLayout>
  );
};

export default ShelterSignUpPage;
