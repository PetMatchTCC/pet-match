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
import { useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import InputMask from "react-input-mask";
import { handleAdopterCreation } from "@/services/authService";
import { AdopterAuthFormValues } from "@/types/authTypes";
import { useAuth } from "@/contexts/AuthContext";
import { UserRoundPlus } from "lucide-react";

const AdopterSignUpPage = () => {
  const { setLoading } = useAuth();

  const navigate = useNavigate();

  const form = useForm<AdopterAuthFormValues>({
    defaultValues: {
      email: "",
      username: "",
      cpf: "",
      phone: "",
      birthday: "",
      address: "",
      password: "",
      repass: "",
    },
  });

  const validateCPF = (cpf: string): boolean => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  };

  const onSubmit = async (data: AdopterAuthFormValues) => {
    await handleAdopterCreation(data, setLoading, navigate);
  };

  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return (
    <LandingLayout>
      <Card className="flex justify-center flex-col w-[95%] max-w-[600px] my-8 p-2">
        <CardTitle className="flex items-center justify-center text-primary gap-1">
          <UserRoundPlus size={28} />
          <h1 className="text-3xl font-bold text-center my-6">
            Cadastro de adotante
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
                    required: "Escolha um nome para a conta",
                    minLength: {
                      value: 5,
                      message: "Escolha um nome maior"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">Nome*</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Como gostaria de ser chamado?"
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
                      message: "E-mail em formato inválido"
                    }
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone">Telefone/Celular</FormLabel>
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
                  name="cpf"
                  rules={{
                    required: "Por favor, informe seu CPF",
                    validate: (value) => validateCPF(value) || "CPF inválido"
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cpf">CPF*</FormLabel>
                      <FormControl>
                        <InputMask
                          mask="999.999.999-99"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                        >
                          {(inputProps: any) => (
                            <Input
                              {...inputProps}
                              id="cpf"
                              placeholder="___.___.___-__"
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
                <FormField
                  control={form.control}
                  name="birthday"
                  rules={{
                    required: "É obrigatório informar a data de nascimento"
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="birhtday">
                        Data de nascimento*
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="birthday"
                          type="date"
                          placeholder="123.456.789-00"
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Endereço</FormLabel>
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
                <Separator className="my-4" />
                <FormField
                  control={form.control}
                  name="password"
                  rules={{
                    required: "Escolha uma senha",
                    minLength: {
                      value: 8,
                      message: "Sua senha é muito curta"
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
                    validate: (value) => value === form.getValues("password") || "As senhas não coincidem"
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

export default AdopterSignUpPage;
