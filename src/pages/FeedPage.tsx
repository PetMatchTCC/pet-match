import PetCard from "@/components/custom/PetCard";
import MainLayout from "@/components/layouts/MainLayout";

const FeedPage = () => {
  return (
    <MainLayout>
      <div className="sticky top-0 bg-background w-full flex items-center justify-center z-10">
        <h1 className="font-bold text-4xl text-orange-500 my-4">PetMatch</h1>
      </div>
      <section className="gap-4 grid grid-cols-1">
        <PetCard />
        <PetCard />
        <PetCard />
        <PetCard />
      </section>
    </MainLayout>
  );
};

export default FeedPage;
