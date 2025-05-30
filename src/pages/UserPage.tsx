import MainLayout from "@/components/layouts/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/firebase/fireConfig";
import { ref, get } from "firebase/database";
import PawLoader from "@/components/custom/PawLoader";
import { Flag, UserIcon } from "lucide-react";
import { PetListItem } from "@/components/custom/PetListItem";

const UserPage = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    setError(null);
    const fetchUser = async () => {
      try {
        const userRef = ref(db, `users/${uid}/meta`);
        const snap = await get(userRef);
        if (snap.exists()) {
          setUserData(snap.val());
        } else {
          setError("Usuário não encontrado.");
        }

        const petsRef = ref(db, `users/${uid}/pets`);
        const petsSnap = await get(petsRef);
        if (petsSnap.exists()) {
          const petsObj = petsSnap.val();
          const petsArray = Object.entries(petsObj).map(
            ([key, value]: any) => ({
              id: key,
              ...value,
            })
          );
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
    fetchUser();
  }, [uid]);

  return (
    <MainLayout>
      <div className="min-h-screen w-full px-2 sm:px-4 md:px-8">
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
        {!loading && !error && (
          <>
            <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8 ">
              <div className="profile-header relative h-48 flex items-end bg-gradient-to-r from-orange-400 to-orange-700">
                <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white ">
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
                      {userData?.username}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {userData?.shelter ? "Abrigo" : "Adotante"}
                    </p>
                  </div>
                  <Link
                    to="/report"
                    className="flex items-center gap-1 border rounded px-3 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <Flag />
                    Reportar
                  </Link>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">
                    {userData?.bio
                      ? userData.bio
                      : "Esse usuário não tem biografia."}
                  </p>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Pets Disponíveis para Adoção
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pets.length === 0 && (
                      <span className="text-gray-500 col-span-full">
                        Nenhum pet cadastrado.
                      </span>
                    )}
                    {pets.map((pet) => (
                      <PetListItem
                        key={pet.id}
                        name={pet.name}
                        age={pet.age}
                        petId={pet.id}
                        me={false}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default UserPage;
