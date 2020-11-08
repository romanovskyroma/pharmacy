import { IPharmacies } from "../interfaces/pharmacies.interface";

export class Pharmacies implements IPharmacies {
  constructor(
    public uid: string,
    public pharmacyName: string,
    public email: string,
    public password: string,
    public pharmacyRegion: string,
    public pharmacyCity: string,
    public pharmacyAdress: string,
    public role: string,
  ) {}
}
