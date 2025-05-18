import { Heart, ServerCog, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PetInterface } from "@/types/petTypes";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "@/firebase/fireConfig";
import PawLoader from "./PawLoader";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface PetCardProps {
  userId: string;
  petId: string;
}
const PetCard: React.FC<PetCardProps> = ({ userId, petId }) => {
  const [petData, setPetData] = useState<PetInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, `users/${userId}/pets/${petId}`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setPetData(snapshot.val() as PetInterface);
        } else {
          setPetData(null);
        }
      } catch (err) {
        console.log("Erro ao buscar pet: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [userId, petId]);

  if (loading) {
    return <LoadingPetCard />;
  }

  if (!petData) {
    return <ErrorPetCard />;
  }

  const getSpecie = (species: string) => {
    if ((species = "dog")) return "Cachorro";
    if ((species = "cat")) return "Gato";
    return "Outra espécie";
  };

  const getSex = (sex: string) => {
    if (sex == "F") return "Fêmea";
    return "Macho";
  };

  const showNegToast = () => {
    toast("Iremos te mostrar menos pets desse tipo", {
      description: "",
      action: {
        label: "Fechar",
        onClick: () => null,
      },
    });
  };

  return (
    <Card className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center p-4">
        <img
          className="w-10 h-10 rounded-full object-cover mr-3"
          src="https://avatar.iran.liara.run/public"
          alt="Avatar do Abrigo"
        />
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            Nome do Abrigo
          </h3>
          <p className="text-xs text-gray-500">Data da postagem</p>
        </div>
      </div>
      <img
        className="w-full h-64 object-cover"
        src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
        alt="Foto do pet"
      />

      <div className="p-4">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            {" "}
            {petData.age} | {petData.name}
          </h2>
        </div>

        <div className="flex flex-row gap-2">
          <span>
            <span className="font-semibold">Sexo:</span> {getSex(petData.sex)}
          </span>
          <span>
            <span className="font-semibold">
              Espécie: {getSpecie(petData.specie)}
            </span>
          </span>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <Button
            className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 hover:bg-orange-300 transition-all duration-200 transform hover:scale-110"
            title="Não curtir"
            onClick={showNegToast}
          >
            <X size={28} />
          </Button>

          <button
            className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 transform hover:scale-110"
            title="Curtir"
          >
            <Heart size={28} />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PetCard;

const ErrorPetCard = () => {
  return (
    <Card className="min-w-80 min-h-80 bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg items-center text-neutral-800 flex justify-center flex-col">
      <ServerCog size={72} />
      <h1>Erro ao buscar pet</h1>
    </Card>
  );
};

const LoadingPetCard = () => {
  return (
    <Card className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
      <PawLoader />
    </Card>
  );
};
