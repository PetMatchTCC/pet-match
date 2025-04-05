import MainLayout from "@/components/layouts/MainLayout";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { uid } = useParams();

  return (
    <MainLayout>
      <h1>Página de perfil</h1>
      <h2>{uid}</h2>
    </MainLayout>
  );
};

export default UserPage;
