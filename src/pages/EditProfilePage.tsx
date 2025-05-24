import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { get, ref, update } from "firebase/database";
import { db } from "@/firebase/fireConfig";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layouts/MainLayout";

const EditProfilePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState<{ username?: string; phone?: string }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const metaRef = ref(db, `users/${user.uid}/meta`);
      const snapshot = await get(metaRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setUsername(data.username || "");
        setPhone(data.phone || "");
        setBio(data.bio || "");
      }
    };
    fetchUserData();
  }, [user]);

  const validate = () => {
    const newErrors: { username?: string; phone?: string } = {};
    if (!username.trim()) newErrors.username = "Nome é obrigatório.";
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phone.trim()) newErrors.phone = "Telefone é obrigatório.";
    else if (!phoneRegex.test(phone)) newErrors.phone = "Telefone deve estar no formato (99) 99999-9999.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    if (nums.length === 0) return "";
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!validate()) return;
    try {
      setLoading(true);
      const metaRef = ref(db, `users/${user.uid}/meta`);
      await update(metaRef, { username, phone, bio });
      alert("Perfil atualizado com sucesso!");
      navigate("/me");
    } catch {
      alert("Erro ao atualizar perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-2xl min-w-[360px] mx-auto mt-10 p-8 bg-white border rounded-lg shadow sm:max-w-3xl sm:p-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">Editar Perfil</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Seu nome"
              disabled={loading}
              className={errors.username ? "border-red-500" : ""}
            />
            {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
            <Input
              id="phone"
              type="text"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="(99) 99999-9999"
              disabled={loading}
              className={errors.phone ? "border-red-500" : ""}
              inputMode="numeric"
            />
            {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Conte um pouco sobre você"
              className="w-full border border-gray-300 rounded-md p-2 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditProfilePage;
