import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchReportTab from "./tabs/SearchReportTab";

const ReportPage = () => {
  return (
    <MainLayout>
      <h1 className="text-xl sm:text-5xl mt-8 font-bold text-orange-500">PetGuard</h1>
      <h2 className="font-semibold my-2 text-neutral-900">Sistema de denúncias do PetMatch</h2>
      <Card className="p-4 sm:w-2/3 w-11/12 mx-4 ">
        <Tabs defaultValue="new" className="flex flex-col items-center w-full">
          <TabsList className="align">
            <TabsTrigger value="new">Nova denúncia</TabsTrigger>
            <TabsTrigger value="search">Buscar por código </TabsTrigger>
          </TabsList>
          <TabsContent value="new" className="p-1 ">
            <h3 className="text-xl font-medium my-2 text-center">Registrar nova denúncia</h3>
            <Input />
            <Input />
            <Button>Enviar </Button>
          </TabsContent>
          <TabsContent value="search" className="p-1 flex flex-col ">
            <SearchReportTab />
          </TabsContent>
        </Tabs>
      </Card>
    </MainLayout>
  );
};

export default ReportPage;
