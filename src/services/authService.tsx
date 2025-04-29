import { doCreateUserWithEmailAndPassword } from "@/firebase/fireAuth";
import {
  AdopterAuthFormValues,
  ShelterAuthFormValues,
} from "@/types/authTypes";
import { db } from "@/firebase/fireConfig";
import { ref, set } from "firebase/database";
import { NavigateFunction } from "react-router-dom";

export const handleAdopterCreation = async (
  data: AdopterAuthFormValues,
  setLoading: (state: boolean) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    setLoading(true);

    const userCredential = await doCreateUserWithEmailAndPassword(
      data.email,
      data.password
    );
    const uid = userCredential.user.uid;

    const dbRef = ref(db, `users/${uid}/meta`);

    const metaData = {
      username: data.username,
      birthday: data.birthday,
      address: data.address || null,
      cpf: data.cpf,
      phone: data.phone || null,
      shelter: false,
    };

    await set(dbRef, metaData);

    console.log("Usuário criado com sucesso!");

    navigate("/login");
  } catch (err) {
    console.error("Erro ao criar usuário: ", err);
  } finally {
    setLoading(false);
  }
};

export const handleShelterCreation = async (
  data: ShelterAuthFormValues,
  setLoading: (state: boolean) => void,
  navigate: NavigateFunction
): Promise<void> => {
  try {
    setLoading(true);

    const userCredential = await doCreateUserWithEmailAndPassword(
      data.email,
      data.password
    );
    const uid = userCredential.user.uid;

    const dbRef = ref(db, `users/${uid}/meta`);

    const metaData = {
      username: data.username,
      address: data.address || null,
      cnpj: data.cnpj,
      phone: data.phone || null,
      shelter: true,
    };

    await set(dbRef, metaData);

    console.log("Usuário criado com sucesso!");

    navigate("/login");
  } catch (err) {
    console.error("Erro ao criar usuário: ", err);
  } finally {
    setLoading(false);
  }
};
