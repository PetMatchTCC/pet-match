const PetCard = () => {
    return (
        <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg">
            // Header do Post
            <div className="flex items-center p-4">
                <img
                    className="w-10 h-10 rounded-full object-cover mr-3"
                    src="https://avatar.iran.liara.run/public"
                    alt="Avatar do Abrigo"
                />
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">Nome do Abrigo</h3>
                        <p className="text-xs text-gray-500">Data da postagem</p>
                    </div>
            </div>

            // Exemplo de imagem do pet
            <img className="w-full h-64 object-cover" src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d" alt="Foto do pet"/>

                // Conteúdo do Post
                <div className="p-4">
                    <div className="flex items-center mb-2">
                        <span className="text-orange-500 mr-1">★</span>
                        <h2 className="text-xl font-bold text-gray-800">Nome do Pet</h2>
                    </div>

                    <p className="text-gray-700 mb-3">
                        Descrição do pet, características especiais ou história interessante...
                        <span className="text-blue-500">#AdotarÉAmor</span>
                    </p>

                    // Botões de Match (Tinder Style - Laranja)
                    <div className="flex justify-center gap-6 mt-6">
                        // Botão de Deslike (Laranja Claro)
                        <button className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-200 text-orange-600 hover:bg-orange-300 transition-all duration-200 transform hover:scale-110"
                            title="Não curtir">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        // Botão de Match (Curtir - Laranja Intenso)
                        <button className="w-16 h-16 flex items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 transform hover:scale-110"
                            title="Curtir">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default PetCard;