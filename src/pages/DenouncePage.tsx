import PawLoader from "@/components/custom/PawLoader";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { db } from "@/firebase/fireConfig";
import { ref, get } from "firebase/database";
import { ChevronLeft, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface DenounceInterface {
  title: string;
  topic: string;
  description: string;
  status: string;
}

const DenouncePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackNavigation = () => {
    navigate(-1);
  };

  const [denounce, setDenounce] = useState<DenounceInterface | null>(null);
  const [error, setError] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchDenounce = async () => {
      try {
        setFetching(true);
        const dbRef = ref(db, `report/${id}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setDenounce(snapshot.val() as DenounceInterface);
          setError("");
        } else {
          setError("Denúncia não encontrada.");
          setDenounce(null);
        }
      } catch (err) {
        setError("Erro ao buscar denúncia.");
        setDenounce(null);
      } finally {
        setFetching(false);
      }
    };

    fetchDenounce();
  }, [id]);

  const renderStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolvido":
        return (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span>Resolvido</span>
          </div>
        );
      case "pendente":
      default:
        return (
          <div className="flex items-center gap-2 text-yellow-600">
            <Clock size={20} />
            <span>Pendente</span>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <h1 className="text-xl sm:text-5xl mt-8 font-bold text-orange-500">
        PetGuard
      </h1>
      <h2 className="font-semibold my-2 text-neutral-900">
        Sistema de denúncias do PetMatch
      </h2>
      <Card className="p-6 sm:w-2/3 w-11/12 mt-4 mb-6 shadow-lg">
        <Button
          className="pl-2"
          onClick={handleBackNavigation}
          variant={"outline"}
        >
          <ChevronLeft />
          <span>Voltar</span>
        </Button>
        <h2 className="font-semibold mt-6 text-neutral-900 text-center text-lg">
          Exibindo denúncia
        </h2>
        <h3 className="text-neutral-700 text-center mb-4">
          ID: <span className="font-mono">{id}</span>
        </h3>

        {fetching ? (
          <PawLoader />
        ) : error ? (
          <div className="flex flex-col items-center text-red-500 mt-4">
            <AlertCircle size={40} />
            <p className="text-center mt-2">{error}</p>
          </div>
        ) : (
          denounce && (
            <div>
              <div className="flex flex-col items-center mb-6">
                <h4 className="font-semibold text-neutral-700 mb-2">
                  Tópico:{" "}
                  <span className="text-neutral-700">{denounce.topic}</span>
                </h4>
                {renderStatus(denounce.status || "pendente")}
              </div>
              <h4 className="text-neutral-900 text-lg text-center font-bold my-4">
                {denounce.title}
              </h4>
              <p className="text-neutral-800 leading-relaxed px-4 text-justify indent-4">
                {denounce.description}
              </p>
            </div>
          )
        )}
      </Card>
    </MainLayout>
  );
};

export default DenouncePage;
