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

const ShelterSignUpPage = () => {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      cnpj: "",
      password: "",
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    await doCreateUserWithEmailAndPassword(data.username, data.password);
    navigate("/feed");
  };

  return (
    <LandingLayout>
      <Card className="flex justify-center flex-col w-[95%] max-w-[600px] my-8 p-2">
        <CardTitle>
          <h1 className="text-3xl font-bold text-center my-6">Cadastro de abrigo</h1>
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
                      <FormLabel htmlFor="username">Nome da instituição</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
                          placeholder="Digite o nome da sua instituição"
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
                      <FormLabel htmlFor="email">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="Digite o e-mail da instituição"
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cnpj">CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          id="cnpj"
                          placeholder="XX.XXX.XXX/0001-XX"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Senha</FormLabel>
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
