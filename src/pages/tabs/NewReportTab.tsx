import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectTrigger, Select, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface FormInput {
  topic: string;
  title: string;
  description: string;
}

const NewReportTab = () => {
  const { handleSubmit, control, reset } = useForm<FormInput>({
    defaultValues: {
      topic: "",
      title: "",
      description: ""
    },
  })

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data)
  }

  return (
    <>
      <h3 className="text-xl font-medium my-3 text-center">Registrar nova denúncia</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange} disabled={field.disabled} >
              <SelectTrigger className="w-[260px]" >
                <SelectValue placeholder="Selecione o tipo de denúncia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bad">Maus-tratos</SelectItem>
                <SelectItem value="ilegal">Venda ilegal</SelectItem>
                <SelectItem value="neglect">Negligência</SelectItem>
                <SelectItem value="other">Outros</SelectItem>
              </SelectContent>
            </Select>

          )}
        />
        <Button type="submit">Enviar</Button>
      </form>

    </>
  );
}

export default NewReportTab;
