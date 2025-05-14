import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { db } from "@/firebase/fireConfig";
import { push, ref, set } from "firebase/database";
import { MessageSquareWarning } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormInput {
  topic: string;
  title: string;
  description: string;
}

const NewReportTab = () => {

  const navigate = useNavigate();

  const form = useForm<FormInput>({
    defaultValues: {
      topic: "",
      title: "",
      description: "",
    },
  });

  const handleInsertReport = async (data: FormInput): Promise<void> => {
    try {
      const dbRef = ref(db, "report");
      const newReportRef = push(dbRef);

      await set(newReportRef, data);

      await navigator.clipboard.writeText(newReportRef.key);

      console.log(
        "Relatório registrado com sucesso! \n Código: ",
        newReportRef.key
      );

      const reportKey = newReportRef.key;

      navigate(`/denounce/${reportKey}`);

      alert(
        `Denúncia enviada com sucesso! Confira o estado da denúncia através da busca por ID: ${reportKey}`
      );
    } catch (err) {
      alert(`Erro: ${err}`);
    }
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    handleInsertReport(data);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <MessageSquareWarning />
        <h3 className="text-xl font-medium my-3 text-center">
          Registrar nova denúncia
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex justify-center"
        >
          <div className="space-y-6 w-full max-w-md">
            <FormField
              control={form.control}
              name="topic"
              rules={{
                required: "Escolha um tópico para classificar sua denúncia. ",
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="topic">Tópico*</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={field.disabled}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o tipo de denúncia" />
                      </SelectTrigger>
                      <SelectContent className="hover:cursor-pointer">
                        <SelectItem
                          value="bad"
                          className="hover:cursor-pointer"
                        >
                          Maus-tratos
                        </SelectItem>
                        <SelectItem
                          value="ilegal"
                          className="hover:cursor-pointer"
                        >
                          Venda ilegal
                        </SelectItem>
                        <SelectItem
                          value="neglect"
                          className="hover:cursor-pointer"
                        >
                          Negligência
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="hover:cursor-pointer"
                        >
                          Outros
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              rules={{
                required: "É obrigatório escolher um título.",
                minLength: {
                  value: 5,
                  message: "O título é muito curto.",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="title">Título da denúncia*</FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Escolha um título direto e objetivo"
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
              name="description"
              rules={{
                required: "É obrigatório descrever sua denúncia.",
                minLength: {
                  value: 50,
                  message: "A descrição é muito curta.",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">
                    Descreva a situação*
                  </FormLabel>
                  <FormControl>
                    <textarea
                      id="description"
                      placeholder="Escreva os detalhes da sua denúncia aqui"
                      className="w-full h-32 text-base leading-6 resize-y p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              Registrar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewReportTab;
