import MainLayout from "@/components/layouts/MainLayout";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/firebase/fireConfig";
import { ref, get } from "firebase/database";
import PawLoader from "@/components/custom/PawLoader";

const UserPage = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState<any>(null);
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
      <div className="min-h-screen">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <PawLoader/>
          </div>
        )}
        {error && (
          <div className="flex justify-center items-center h-64">
            <span className="text-red-500">{error}</span>
          </div>
        )}
        {!loading && !error && (
          <>
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
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8">

              <div className="profile-header relative h-48 flex items-end">
                <div className="absolute -bottom-16 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-white">
                  <img
                    src={userData?.avatar || "https://tinyurl.com/mburjtmz"}
                    alt="Avatar do usuário"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6 pt-20">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{userData?.username}</h1>
                    <p className="text-sm text-gray-500">{userData?.username}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700">
                    {userData?.bio}
                  </p>
                </div>

                <div className="mt-6 flex gap-6 text-center">
                  <div>
                    <span className="block text-2xl font-bold text-orange-500">{userData?.petsPosted || 12}</span>
                    <span className="text-sm text-gray-500">Pets Postados</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-orange-500">{userData?.followers || 350}</span>
                    <span className="text-sm text-gray-500">Seguidores</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold text-orange-500">{userData?.likes || 15}</span>
                    <span className="text-sm text-gray-500">Curtidas</span>
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Pets Disponíveis para Adoção</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
                      <img className="w-full h-48 object-cover" src="https://tinyurl.com/55c3zx7a" alt="Foto do pet" />
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-orange-500 mr-1">★</span>
                          <h3 className="text-lg font-bold text-gray-800">Bolt</h3>
                        </div>
                        <p className="text-gray-700 mb-3 text-sm">
                          Cachorro brincalhão, vacinado e pronto para adoção! Adora crianças.
                          <span className="text-blue-500"> #AdotarÉAmor</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
                      <img className="w-full h-48 object-cover" src="https://tinyurl.com/3yrktheh" alt="Foto do pet" />
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <span className="text-orange-500 mr-1">★</span>
                          <h3 className="text-lg font-bold text-gray-800">Luna</h3>
                        </div>
                        <p className="text-gray-700 mb-3 text-sm">
                          Gata carinhosa e tranquila. Ideal para apartamentos.
                          <span className="text-blue-500"> #AdotarÉAmor</span>
                        </p>
                      </div>
                    </div>

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
