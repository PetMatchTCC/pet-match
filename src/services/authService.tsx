import { doCreateUserWithEmailAndPassword } from "@/firebase/fireAuth";
import {
  AdopterAuthFormValues,
  ShelterAuthFormValues,
} from "@/types/authTypes";
import { auth, db } from "@/firebase/fireConfig";
import { ref, set } from "firebase/database";
import { NavigateFunction } from "react-router-dom";
import { updateProfile } from "firebase/auth";

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

    const notRef = ref(db, `users/${uid}/notifications`);

    const notData = {
      date: new Date().toLocaleDateString(),
      text: "Bem-vindo(a) ao PetMatch",
    };

    await set(notRef, notData);

    await updateProfile(auth.currentUser!, {
      displayName: String(metaData.username),
    });

    alert("Usuário criado com sucesso");

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

    const notRef = ref(db, `users/${uid}/notifications`);

    const notData = {
      date: new Date().toLocaleDateString(),
      text: "Bem-vindo(a) ao PetMatch",
    };

    await set(notRef, notData);

    await updateProfile(auth.currentUser!, {
      displayName: String(metaData.username),
    });

    alert("Usuário criado com sucesso");

    navigate("/login");
  } catch (err) {
    console.error("Erro ao criar usuário: ", err);
  } finally {
    setLoading(false);
  }
};
