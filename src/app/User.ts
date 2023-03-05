import {PetType} from "./PetType";

export interface User {
  id?: number;
  name: string;
  petType: PetType;
}
