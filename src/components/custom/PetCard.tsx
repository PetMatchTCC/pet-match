import { Heart, X } from "lucide-react";
import { Card } from "@/components/ui/card";

const PetCard = () => {
  return (
    <Card className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
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
          <span className="text-orange-500 mr-1">★</span>
          <h2 className="text-xl font-bold text-gray-800">Nome do Pet</h2>
        </div>

        <p className="text-gray-700 mb-3">
          Descrição do pet, características especiais ou história
          interessante...
          <span className="text-blue-500">#AdotarÉAmor</span>
        </p>

        <div className="flex justify-center gap-6 mt-6">
          <button
            className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 hover:bg-orange-300 transition-all duration-200 transform hover:scale-110"
            title="Não curtir"
          >
            <X size={28} />
          </button>

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
