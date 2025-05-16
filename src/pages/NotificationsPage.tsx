import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { db } from "@/firebase/fireConfig.tsx";
import PawLoader from "@/components/custom/PawLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface NotificationInterface {
  title: string;
  desc: string;
}

const NotificationPage = () => {
  const { user } = useAuth();
  const uid = user?.uid;

  const [notifications, setNotifications] = useState<
    Array<NotificationInterface>
  >([]);
  const [error, setError] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setFetching(true);
        const dbRef = ref(db, `users/${uid}/notifications`);
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          setNotifications(snapshot.val());
          setError("");
        } else {
          setError("Not.");
          setNotifications([]);
        }
      } catch (err) {
        setError(`Erro ao buscar notificações: {err}`);
        setNotifications([]);
      } finally {
        setFetching(false);
      }
    };
    fetchNotifications();
  }, [uid]);

  if (fetching) return <PawLoader />;

  return (
    <MainLayout>
      <h1 className="font-bold text-4xl text-orange-500 my-4">Notificações</h1>
      <Separator className="mx-4 my-4 max-w-3xl w-full" />
      {error ? (
        <span>{error}</span>
      ) : (
        <div className="max-w-3xl w-full">
          {notifications.map((item, key) => (
            <Alert key={key}>
              <Info className="h-4 w-4" />
              <AlertTitle>{item?.title}</AlertTitle>
              <AlertDescription>{item?.desc}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </MainLayout>
  );
};

export default NotificationPage;
