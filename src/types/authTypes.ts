export interface AdopterAuthFormValues {
  email: string; // user@email.com
  username: string;
  cpf: string; // 123.456.789-00
  birthday: string; // DD-MM-AAAA
  password: string;
  phone?: string; // (00) 12345-6789
  address?: Address; // Rua, 123, Cidade. BRASIL.
}

export interface ShelterAuthFormValues {
  email: string; // user@email.com
  username: string;
  cnpj: string; // XX.XXX.XXX/0001-XX
  password: string;
  phone?: string; // (00) 12345-6789
  address: Address; // Rua, 123, Cidade. BRASIL.
}

export interface LoginFormValues {
  email: string;
  password: string;
}

type Address = {
  country: "Brasil" | "Exterior";
  city: string;
  street: string;
  number: number;
};