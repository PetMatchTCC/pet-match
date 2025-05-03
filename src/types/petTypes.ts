export interface PetInterface {
  age: number;
  specie: SpeciesEnum;
  name: string;
  shelter: string;
  description: string;
  date: Date;
}

enum SpeciesEnum {
  Dog,
  Cat,
  Non,
}
