import { AuthProvider } from "./contexts/AuthContext";
import { RoutesIndex } from "./routes/routesIndex";

const App = () => {
  return (
    <>
      <AuthProvider>
        <RoutesIndex />
      </AuthProvider>
    </>
  );
};
export default App;
