import { Injectable } from '@angular/core';
import { IVacancy } from '../interfaces/vacancy.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  vacancyColection: AngularFirestoreCollection<IVacancy>;
  vacancy: Observable<IVacancy[]>;
  itemDoc: any;

  constructor(public firestore: AngularFirestore) {
    this.vacancyColection = this.firestore.collection<IVacancy>('vacancies');
    this.vacancy = this.vacancyColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IVacancy;
        const id = a.payload.doc.id;
        return { id, ...data }
      })
    })
  }

  getFSVacansies(): Observable<IVacancy[]> {
    return this.vacancy;
  }
 
  addFSVacansy(vacancy: IVacancy): void {
    this.vacancyColection.add(vacancy);
  }

  getOneVacancy(id: string): any {
    this.itemDoc = this.firestore.doc<IVacancy>('vacancies/' + id);
    const item = this.itemDoc.valueChanges();
    return item;  
  }


}
