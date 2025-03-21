import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const FeedPage = () => {
  const { logout } = useAuth();
  return (
    <>
      <h1>Este é o feed</h1>
      <h2>Você está logado!</h2>
      <Button onClick={logout}>Sair </Button>
    </>
  );
};

export default FeedPage;
