import React, { useState } from 'react';

const PetForm = () => {
  const [formData, setFormData] = useState({
    petNome: '',
    petIdade: '',
    abrigoNome: '',
    abrigoEndereco: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Para salvar api (se necessário)
    console.log('Cadastro enviado:', formData);

    // Exemplo de salvar no localStorage
    localStorage.setItem('cadastroPetAbrigo', JSON.stringify(formData));

    // Limpa o formulário após o envio
    setFormData({
      petNome: '',
      petIdade: '',
      abrigoNome: '',
      abrigoEndereco: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Cadastro de Pet e Abrigo</h2>

      <label className="block mb-2">Nome do Pet:</label>
      <input
        type="text"
        name="petNome"
        value={formData.petNome}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Digite o nome do pet"
      />

      <label className="block mb-2">Idade do Pet:</label>
      <input
        type="text"
        name="petIdade"
        value={formData.petIdade}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Digite a idade do pet"
      />

      <label className="block mb-2">Nome do Abrigo:</label>
      <input
        type="text"
        name="abrigoNome"
        value={formData.abrigoNome}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Digite o nome do abrigo"
      />

      <label className="block mb-2">Endereço do Abrigo:</label>
      <input
        type="text"
        name="abrigoEndereco"
        value={formData.abrigoEndereco}
        onChange={handleChange}
        className="w-full mb-4 p-2 border rounded"
        placeholder="Digite o endereço do abrigo"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Cadastrar
      </button>
    </form>
  );
};

export default PetForm;
