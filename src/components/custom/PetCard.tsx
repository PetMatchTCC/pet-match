import {
  Bone,
  ChevronDown,
  Fingerprint,
  Flag,
  GalleryVertical,
  Heart,
  ImageIcon,
  Phone,
  ServerCog,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { PetInterface } from "@/types/petTypes";
import { useEffect, useState } from "react";
import { get, push, ref } from "firebase/database";
import { db } from "@/firebase/fireConfig";
import PawLoader from "./PawLoader";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface PetCardProps {
  userId: string;
  petId: string;
}

interface ShelterInterface {
  address: string;
  username: string;
  phone: string;
}
const PetCard: React.FC<PetCardProps> = ({ userId, petId }) => {
  const [petData, setPetData] = useState<PetInterface | null>(null);
  const [shelterData, setShelterData] = useState<ShelterInterface | null>(null);
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

    const fetchShelterData = async () => {
      try {
        setLoading(true);
        const dbRef = ref(db, `users/${userId}/meta`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setShelterData(snapshot.val());
        } else {
          setShelterData(null);
        }
      } catch (err) {
        console.log("Erro ao buscar dados do abrigo: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchShelterData();
    fetchPetData();
  }, [userId, petId]);

  if (loading) {
    return <LoadingPetCard />;
  }

  if (!petData) {
    return <ErrorPetCard />;
  }

  const getSpecie = (species: string) => {
    if (species == "dog") return "Cachorro";
    if (species == "cat") return "Gato";
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
        label: <ChevronDown />,
        onClick: () => null,
      },
    });
  };

  const { user } = useAuth();
  const uid = user?.displayName;

  const handleLike = () => {
    try {
      const currentDate = new Date();
      const formatedDate = currentDate.toLocaleDateString("pt-BR");

      const msg = `${uid} curtiu seu post do pet ${petData.name}`;

      const petRef = ref(db, `users/${userId}/notifications`);

      push(petRef, {
        text: msg,
        date: formatedDate,
      });

      toast("Pet curtido", {
        description: String(petData.name),
        action: {
          label: <ChevronDown />,
          onClick: () => null,
        },
      });
    } catch (err) {
      toast("Erro ao curtir:", {
        description: String(err),
        action: {
          label: <ChevronDown />,
          onClick: () => null,
        },
      });
    }
  };

  return (
    <Card className="max-w-md bg-white rounded-lg shadow-md overflow-hidden w-full">
      <div className="flex items-center p-4 justify-between">
        <img
          className="w-10 h-10 rounded-full object-cover mr-3"
          src="https://avatar.iran.liara.run/public"
          alt="Avatar do Abrigo"
        />
        <div>
          <a href={`/user/${userId}`}>
            <h3 className="text-sm font-semibold text-gray-800">
              {shelterData?.username}
            </h3>
          </a>
          <p className="text-xs text-gray-500">{shelterData?.address}</p>
        </div>
        <a href="/report">
          <Button
            variant="outline"
            className="rounded-full"
          >
            <Flag />
          </Button>
        </a>
      </div>
      <div className="w-full h-64 object-cover bg-neutral-100 flex items-center justify-center">
        <ImageIcon size={32} />
      </div>

      <div className="p-4">
        <div className="flex items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            {" "}
            {petData.age} | {petData.name}
          </h2>
        </div>

        <div className="flex flex-row gap-2 my-2">
          <div className="flex flex-row">
            <span className="font-semibold flex flex-row gap-1 mr-1">
              <Fingerprint />
              Sexo:
            </span>{" "}
            {getSex(petData.sex)}
          </div>
          <div className="flex flex-row">
            <span className="font-semibold flex flex-row gap-1 mr-1">
              <Bone />
              Espécie:
            </span>
            {getSpecie(petData.specie)}
          </div>
        </div>

        <div className="flex flex-row gap-1">
          <span className="flex flex-row font-semibold gap-2 text-neutral-800">
            <Phone /> Contato:
          </span>
          <span className="text-neutral-800">{shelterData?.phone}</span>
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <Button
            className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 hover:bg-orange-300 transition-all duration-200 transform hover:scale-110"
            title="Não curtir"
            onClick={showNegToast}
          >
            <X size={28} />
          </Button>

          <Button
            className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 transform hover:scale-110"
            title="Curtir"
            onClick={handleLike}
          >
            <Heart size={28} />
          </Button>
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
