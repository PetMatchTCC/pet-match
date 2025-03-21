import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PawLoader from "@/components/custom/PawLoader";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <PawLoader />;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
};

export default ProtectedRoute;
