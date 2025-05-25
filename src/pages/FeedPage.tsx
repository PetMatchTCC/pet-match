import { useState } from 'react';

const FeedPage = () => {
  const petData = [
    {
      name: 'Bolt',
      description: 'Cachorro • Poodle • Branco',
      photos: [
        'https://images.unsplash.com/photo-1642884690588-3fadb5260383?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1624658289837-9bbdb4991d9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D',
        'https://plus.unsplash.com/premium_photo-1669277330871-443462026e13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8'
      ]
    },
    {
      name: 'Luna',
      description: 'Gato • Siamês • Preto',
      photos: [
        'https://media.istockphoto.com/id/1135557161/pt/foto/the-black-cat.webp?a=1&s=612x612&w=0&k=20&c=1e2dYviR7Y52T7v_QQ-XqY917dH4R_pLBPxhVys8D7Y=',
        'https://images.unsplash.com/photo-1702345695651-9833eefbf1a7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D'
      ]
    },
    {
      name: 'Thor',
      description: 'Cachorro • Golden • Dourado',
      photos: [
        'https://images.unsplash.com/photo-1558788353-f76d92427f16?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1622984337754-eda69dc8c9cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEdvbGRlbiUyMERvZ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://images.unsplash.com/photo-1651087449737-7c784fb0c1e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fEdvbGRlbiUyMERvZ3xlbnwwfHwwfHx8MA%3D%3D'
      ]
    }
  ];

  const [currentIndices, setCurrentIndices] = useState(petData.map(() => 0));
  const [liked, setLiked] = useState(petData.map(() => false));
  const [disliked, setDisliked] = useState(petData.map(() => false));

  const nextPhoto = (index: number) => {
    setCurrentIndices((prev) => {
      const newIndices = [...prev];
      newIndices[index] = (newIndices[index] + 1) % petData[index].photos.length;
      return newIndices;
    });
  };

  const prevPhoto = (index: number) => {
    setCurrentIndices((prev) => {
      const newIndices = [...prev];
      newIndices[index] = (newIndices[index] - 1 + petData[index].photos.length) % petData[index].photos.length;
      return newIndices;
    });
  };

  const handleLike = (index: number) => {
    setLiked((prev) => {
      const newLiked = [...prev];
      newLiked[index] = true;
      return newLiked;
    });

    setTimeout(() => {
      setLiked((prev) => {
        const newLiked = [...prev];
        newLiked[index] = false;
        return newLiked;
      });
    }, 500);
  };

  const handleDislike = (index: number) => {
    setDisliked((prev) => {
      const newDisliked = [...prev];
      newDisliked[index] = true;
      return newDisliked;
    });

    setTimeout(() => {
      setDisliked((prev) => {
        const newDisliked = [...prev];
        newDisliked[index] = false;
        return newDisliked;
      });
    }, 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 max-w-3xl">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-orange-500 mb-2">Pet Match</h1>
          <p className="text-sm text-gray-500">Encontre seu próximo amigo de estimação!</p>
        </header>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {petData.map((pet, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
              <div className="relative">
                <img
                  className="w-full h-64 object-cover pet-photo"
                  src={pet.photos[currentIndices[index]]}
                  alt={`Foto de ${pet.name}`}
                />
                <div
                  className="arrow-btn left-2 absolute top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 cursor-pointer hover:bg-white/90"
                  onClick={() => prevPhoto(index)}
                >
                  <i className="fas fa-chevron-left"></i>
                </div>
                <div
                  className="arrow-btn right-2 absolute top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 cursor-pointer hover:bg-white/90"
                  onClick={() => nextPhoto(index)}
                >
                  <i className="fas fa-chevron-right"></i>
                </div>

                {liked[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                    <i className="fas fa-heart text-orange-500 text-6xl animate-ping"></i>
                  </div>
                )}

                {disliked[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                    <i className="fas fa-times text-red-500 text-6xl animate-ping"></i>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2 flex-wrap gap-1">
                  <h3 className="text-lg font-semibold text-gray-800">{pet.name}</h3>
                  <span className="text-gray-400">|</span>
                  <p className="text-sm text-gray-600">{pet.description}</p>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition transform hover:scale-110"
                    title="Não curtir"
                    onClick={() => handleDislike(index)}
                  >
                    <i className="fas fa-times fa-lg"></i>
                  </button>
                  <button
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition transform hover:scale-110"
                    title="Curtir"
                    onClick={() => handleLike(index)}
                  >
                    <i className="fas fa-heart fa-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PetMatch - Encontre seu novo amigo</p>
        </footer>
      </div>
    </div>
  );
};

export default FeedPage;
