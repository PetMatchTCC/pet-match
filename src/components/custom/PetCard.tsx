import React, { useEffect, useState } from "react";
import PetCard from "./PetCard"; // ajuste o caminho conforme seu projeto
import { db } from "@/firebase/fireConfig";
import { ref, get } from "firebase/database";
import { Card } from "@/components/ui/card";

interface PetFeedItem {
  userId: string;
  petId: string;
}

const FeedPage: React.FC = () => {
  const [feedPets, setFeedPets] = useState<PetFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca todos os usuários que têm pets
        const usersRef = ref(db, "users");
        const usersSnapshot = await get(usersRef);

        if (!usersSnapshot.exists()) {
          setFeedPets([]);
          setLoading(false);
          return;
        }

        const usersData = usersSnapshot.val();

        // Montar array de {userId, petId} para cada pet disponível
        const petsList: PetFeedItem[] = [];

        Object.entries(usersData).forEach(([userId, userData]: any) => {
          if (userData.pets) {
            Object.keys(userData.pets).forEach((petId) => {
              petsList.push({ userId, petId });
            });
          }
        });

        setFeedPets(petsList);
      } catch (err) {
        console.error("Erro ao carregar feed:", err);
        setError("Erro ao carregar feed");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <p>Carregando pets...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center text-red-600">
        <p>{error}</p>
      </Card>
    );
  }

  if (feedPets.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p>Nenhum pet disponível no momento.</p>
      </Card>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl space-y-8">
      {feedPets.map(({ userId, petId }) => (
        <PetCard key={`${userId}-${petId}`} userId={userId} petId={petId} />
      ))}
    </div>
  );
};

export default FeedPage;
