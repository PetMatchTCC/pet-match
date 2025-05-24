import MainLayout from "@/components/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext.tsx";
import { useEffect, useState } from "react";
import { get, ref, remove } from "firebase/database";
import { db } from "@/firebase/fireConfig.tsx";
import PawLoader from "@/components/custom/PawLoader";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronDown, Info, Trash, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface NotificationInterface {
  key?: string;
  text: string;
  date: string;
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
          const data = snapshot.val();
          const list = Object.entries(data).map(([key, value]) => ({
            key,
            ...(value as NotificationInterface),
          }));
          setNotifications(list);
        } else {
          setError("Nenhuma notificação");
          setNotifications([]);
        }
      } catch (err) {
        setError(`Erro ao buscar notificações: ${err}`);
        setNotifications([]);
      } finally {
        setFetching(false);
      }
    };
    fetchNotifications();
  }, [uid]);

  const handleDeleteNotification = async (key: string | undefined) => {
    try {
      const notificationRef = ref(db, `users/${uid}/notifications/${key}`);
      await remove(notificationRef);
      setNotifications((prev) => prev.filter((n) => n.key !== key));
      toast("Notificação apagada", {
        action: {
          onClick: () => null,
          label: <ChevronDown />,
        },
      });
    } catch (err) {
      toast("Erro ao apagar", {
        description: String(err),
        action: {
          onClick: () => null,
          label: <ChevronDown />,
        },
      });
    }
  };

  const deleteAll = async () => {
    try {
      const notificationsRef = ref(db, `users/${user?.uid}/notifications`);
      await remove(notificationsRef);
      setNotifications([]);
      toast("Sucesso", {
        description: "Todas as notificações foram apagadas.",
        action: {
          onClick: () => null,
          label: <ChevronDown />,
        },
      });
    } catch (err) {
      toast("Erro ao apagar", {
        description: String(err),
        action: {
          onClick: () => null,
          label: <ChevronDown />,
        },
      });
    }
  };

  if (fetching) return <PawLoader />;

  return (
    <MainLayout>
      <h1 className="font-bold text-4xl text-orange-500 my-4">Notificações</h1>

      <Separator className="mx-4 my-4 max-w-3xl w-full" />
      {error ? (
        <span>{error}</span>
      ) : (
        <div className="max-w-3xl w-full gap-4">
          {notifications.map((item, key) => (
            <Alert
              key={key}
              className="my-2"
            >
              <Info className="h-4 w-4" />
              <AlertTitle className="flex justify-between">
                {item?.text}
                <Button
                  className="h-4 rounded-full w-1"
                  variant="outline"
                  onClick={() => handleDeleteNotification(item.key)}
                >
                  <X />
                </Button>
              </AlertTitle>
              <AlertDescription>{item?.date}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
      <Button
        className="fixed bottom-4 right-4 z-50"
        onClick={deleteAll}
        variant="outline"
      >
        <Trash />
        Apagar todas
      </Button>
    </MainLayout>
  );
};

export default NotificationPage;
