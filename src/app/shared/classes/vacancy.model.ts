import { IVacancy } from '../interfaces/vacancy.interface';

export class Vacancy implements IVacancy {
    constructor(
       public position: string,
       public city: string,
       public salery: number,
       public experienceYears: number,
       public skills: string,
       public aboutCompany: string,
    ) {}
    
} 