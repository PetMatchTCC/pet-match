import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
  reportId: string;
}

const SearchReportTab: React.FC = () => {
  const form = useForm<FormInput>({ defaultValues: { reportId: "" } });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data.reportId);
  };

  return (
    <>
      <div className="flex flex-row items-center justify-center gap-2">
        <Search />
        <h3 className="text-xl font-medium my-3 text-center">
          Buscar denúncia por código
        </h3>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex justify-center"
        >
          <div className="space-y-6 w-full max-w-md mb-4">
            <FormField
              control={form.control}
              name="reportId"
              rules={{
                required: "Não é possível buscar um código em branco.",
                minLength: {
                  value: 20,
                  message:
                    "Por padrão, o código de uma denúncia deve ter 20 caractéres.",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="topic">Código da denúncia</FormLabel>
                  <FormControl>
                    <Input
                      id="reportId"
                      type="text"
                      placeholder="Insira aqui o código da denúncia"
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
              Buscar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SearchReportTab;
