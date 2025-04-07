import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SearchReportTab: React.FC = () => {

  const [reportId, setReportId] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportId(e.target.value);
  };

  const handleSearch = () => {
    console.log(reportId);
  };

  return (
    <div className="gap-4">
      <h3 className="text-xl font-medium my-2">Buscar denúncia por código</h3>
      <Input
        id="id_denuncia"
        placeholder="Digite o código da denúncia"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        onChange={handleChange}
        value={reportId}
      />
      <Button className="my-2 self-end w-full bg-orange-500 hover:bg-orange-600" onClick={handleSearch}>Buscar</Button>
    </div>
  );
}

export default SearchReportTab;
