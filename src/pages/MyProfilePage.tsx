import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, User as UserIcon, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/firebase/fireConfig";
import { ref, get, remove } from "firebase/database";
import { useAuth } from "@/contexts/AuthContext";
import PawLoader from "@/components/custom/PawLoader";

const MyProfilePage = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [userData, setUserData] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Busca dados do usuário e pets
  const fetchUserAndPets = async () => {
    if (!uid) return;
    try {
      setLoading(true);
      setError(null);

      // Busca dados do usuário
      const userRef = ref(db, `users/${uid}/meta`);
      const snap = await get(userRef);

      if (snap.exists()) {
        setUserData(snap.val());
      } else {
        setUserData(null);
        setError("Usuário não encontrado.");
      }

      // Busca pets
      const petsRef = ref(db, `users/${uid}/pets`);
      const petsSnap = await get(petsRef);
      if (petsSnap.exists()) {
        const petsObj = petsSnap.val();
        const petsArray = Object.entries(petsObj).map(([key, value]: any) => ({
          id: key,
          ...value,
        }));
        setPets(petsArray);
      } else {
        setPets([]);
      }
    } catch (err) {
      setError("Erro ao buscar dados do usuário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserAndPets();
    // eslint-disable-next-line
  }, [uid]);

  // Excluir pet
  const handleDeletePet = async (petId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este pet?")) return;
    try {
      await remove(ref(db, `users/${uid}/pets/${petId}`));
      setPets(pets.filter(p => p.id !== petId));
    } catch {
      alert("Erro ao excluir pet.");
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-screen px-2 sm:px-4 md:px-8">
        <style
          dangerouslySetInnerHTML={{
            __html: `
        .profile-header {
          background-image: url('https://tinyurl.com/3knxyu54');
          background-size: cover;
          background-position: center;
        }
      `,
          }}
        />
        <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8 px-2 sm:px-4 md:px-8">
          {loading && (
            <div className="flex justify-center items-center h-64">
              <PawLoader />
            </div>
          )}
          {error && (
            <div className="flex justify-center items-center h-64">
              <span className="text-red-500">{error}</span>
            </div>
          )}
          {!loading && !error && userData && (
            <>
              <div className="profile-header relative h-48 flex items-end">
                <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white flex items-center justify-center">
                  {userData?.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="Avatar do usuário"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-full">
                      <UserIcon className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-20">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                      {userData?.username || "Nome não informado"}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {userData?.shelter ? "Abrigo" : "Adotante"}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">
                    {userData?.bio || "Sem bio cadastrada."}
                  </p>
                </div>

                <div className="mt-6 flex gap-6 text-center">
                  <div>
                    <span className="block text-2xl font-bold text-orange-500">
                      {userData?.petsPosted || 0}
                    </span>
                    <span className="text-sm text-gray-500">Pets Postados</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-orange-500">
                      {userData?.followers || 0}
                    </span>
                    <span className="text-sm text-gray-500">Seguidores</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-orange-500">
                      {userData?.likes || 0}
                    </span>
                    <span className="text-sm text-gray-500">Curtidas</span>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Pets Disponíveis para Adoção
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pets.length === 0 && (
                      <span className="text-gray-500 col-span-full">
                        Nenhum pet cadastrado.
                      </span>
                    )}
                    {pets.map((pet) => (
                      <div
                        key={pet.id}
                        className="bg-gray-50 rounded-lg shadow p-4 flex flex-col items-center relative"
                      >
                        <h3 className="font-semibold text-lg">
                          {pet.name || "Sem nome"}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Idade: {pet.age ? `${pet.age} anos` : "Não informada"}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Button
                            size="sm"
                            className="bg-orange-500 text-white hover:bg-orange-600"
                            asChild
                          >
                            <a href={`/edit-pet/${pet.id}`}>
                              <Pencil className="w-4 h-4 mr-1" /> Editar
                            </a>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="text-white bg-red-500 hover:bg-red-600"
                            onClick={() => handleDeletePet(pet.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {userData?.shelter && (
        <Button
          className="fixed bottom-6 right-6 z-10 bg-orange-500 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg hover:bg-orange-600 transition-colors duration-200"
          aria-label="Adicionar novo pet"
        >
          <Plus />
          Adicionar Pet
        </Button>
      )}
    </MainLayout>
  );
};

export default MyProfilePage;
