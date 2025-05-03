import PetCard from "@/components/custom/PetCard";
import MainLayout from "@/components/layouts/MainLayout";

const FeedPage = () => {
  return (
    <MainLayout>
      <h1 className="font-bold text-4xl mt-8">Este é o feed</h1>
      <h2 className="font-semibold">Você está logado!</h2>
      <PetCard />
    </MainLayout>
  );
};

export default FeedPage;
