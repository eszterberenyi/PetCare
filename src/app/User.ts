import {PetType} from "./PetType";

export interface User {
  id?: number;
  doctorId?: number,
  name: string;
  petType: PetType;
}
