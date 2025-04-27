export interface AdopterAuthFormValues {
  email: string; // user@email.com
  username: string;
  cpf: string; // 123.456.789-00
  birthday: string; // DD-MM-AAAA
  password: string;
  repass: string;
  phone?: string; // (00) 12345-6789
  address?: string; // Rua, 123, Cidade. BRASIL.
}

export interface ShelterAuthFormValues {
  email: string; // user@email.com
  username: string;
  cnpj: string; // XX.XXX.XXX/0001-XX
  password: string;
  repass: string;
  phone?: string; // (00) 12345-6789
  address: string; // Rua, 123, Cidade. BRASIL.
}

export interface LoginFormValues {
  email: string;
  password: string;
}

// TODO: implementar uma versão mais completa do cadastro de endereço

type Address = {
  country: "Brasil" | "Exterior";
  city: string;
  street: string;
  number: number;
};
