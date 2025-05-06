import MainLayout from "@/components/layouts/MainLayout";
import { useParams } from "react-router-dom";
import { Plus } from 'lucide-react';

const UserPage = () => {
  const { uid } = useParams();

  return (
    <MainLayout>
      <div className="min-h-screen">
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
                src="https://tinyurl.com/mburjtmz"
                alt="Avatar do usuário"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-6 pt-20">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">João Silva</h1>
                <p className="text-sm text-gray-500">@joaosilva</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-700">
                Apaixonado por animais e voluntário em ONGs de proteção animal. Adoro ajudar pets a encontrarem lares amorosos.
              </p>
            </div>

            <div className="mt-6 flex gap-6 text-center">
              <div>
                <span className="block text-2xl font-bold text-orange-500">12</span>
                <span className="text-sm text-gray-500">Pets Postados</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-orange-500">350</span>
                <span className="text-sm text-gray-500">Seguidores</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-orange-500">15</span>
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

      </div>

      <button
        className="fixed bottom-6 right-6 z-10 bg-orange-500 text-white rounded-lg px-4 py-2 flex items-center gap-2 shadow-lg hover:bg-orange-600 transition-colors duration-200"
        aria-label="Adicionar novo pet"
      >
        <Plus />
        Adicionar Pet
      </button>
    </MainLayout>
  );
};

export default UserPage;
