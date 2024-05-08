// Dans la classe Competition
import { TypeC } from "./TypeC";

export class Competition {
  idC: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isOnline: boolean;
  location: string;
  typeC: TypeC;

  constructor(
    idC: number,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    isOnline: boolean,
    location: string,
    typeC: TypeC
    // Ajoutez les paramètres pour les prix et les utilisateurs si nécessaire
  ) {
    this.idC = idC;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isOnline = isOnline;
    this.location = location;
    this.typeC = typeC;
    // Initialisez les prix et les utilisateurs si nécessaire
  }
}
