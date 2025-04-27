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
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: { username: string; password: string }) => {
    await login(data.username, data.password);
    navigate("/feed");
  };

  const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  return (
    <LandingLayout>
      <Card className="flex justify-center flex-col w-[95%] max-w-[600px] my-8 p-2">
        <CardTitle className="flex items-center justify-center text-primary gap-1">
          <LogIn size={28} />
          <h1 className="text-3xl font-bold text-center my-6">Login</h1>
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
                    required: "Preencha seu email",
                    pattern: {
                      value: emailRegex,
                      message: "Digite um e-mail válido",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="username">E-mail</FormLabel>
                      <FormControl>
                        <Input
                          id="username"
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
                  name="password"
                  rules={{
                    required: "Digite sua senha",
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          placeholder="Digite sua senha"
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
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="items-center flex gap-1 justify-center">
          <span className="font-semibold text-neutral-600">
            Ainda não tem uma conta?
          </span>
          <Link to="/signup">
            <span className="font-semibold text-primary underline">
              Crie agora mesmo
            </span>
          </Link>
        </CardFooter>
      </Card>
    </LandingLayout>
  );
};

export default LoginPage;
