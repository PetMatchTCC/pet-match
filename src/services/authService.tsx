import { useAuth } from "@/contexts/AuthContext";
import { doCreateUserWithEmailAndPassword } from "@/firebase/fireAuth";
import { AdopterAuthFormValues } from "@/types/authTypes";
import { db } from "@/firebase/fireConfig";
import { ref, set } from "firebase/database";

export const handleAdopterCreation = async (data: AdopterAuthFormValues): Promise<void> => {
  const { setLoading } = useAuth();

  try {
    setLoading(true);

    const userCredential = await doCreateUserWithEmailAndPassword(data.email, data.password);
    const uid = userCredential.user.uid;

    const dbRef = ref(db, `users/${uid}/meta`);

    const metaData = {
      username: data.username,
      birthday: data.birthday,
      address: data.address || null,
      cpf: data.cpf,
      phone: data.phone || null
    };

    await set(dbRef, metaData);

    console.log("Usuário criado com sucesso!");
  }
  catch (err) {
    console.error("Erro ao criar usuário:", err);
  }
  finally {
    setLoading(false);
  }
};
