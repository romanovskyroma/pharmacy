import { IPharmCompanies } from '../interfaces/pharmcompanies.interface';

export class PharmCompanies implements IPharmCompanies {
    constructor(
        public uid: string,
        public pharmCompanyName: string,
        public email: string,
        public password: string,
        public pharmCompanyCity: string,
        public pharmCompanyAdress: string,
        public role: string,
    ){}
}