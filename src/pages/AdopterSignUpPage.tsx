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

  const onSubmit = async (data: AdopterAuthFormValues) => {
    await handleAdopterCreation(data, setLoading, navigate);
  };

  return (
    <LandingLayout>
      <Card className="flex justify-center flex-col w-[95%] max-w-[600px] my-8 p-2">
        <CardTitle>
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
