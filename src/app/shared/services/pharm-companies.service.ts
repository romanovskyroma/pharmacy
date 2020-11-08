import { Injectable } from '@angular/core';
import { IPharmCompanies } from '../interfaces/pharmcompanies.interface';
import { PharmCompanies } from '../classes/pharmcompanies.model'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PharmCompaniesService {
  pharmCompaniesColection: AngularFirestoreCollection<PharmCompanies>;
  pharmCompanies: Observable<PharmCompanies[]>;

  constructor(public firestore: AngularFirestore) {
    this.pharmCompaniesColection = this.firestore.collection<IPharmCompanies>('pharmCompanies');
    this.pharmCompanies = this.pharmCompaniesColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as PharmCompanies;
        return data;
      })
    })
  }


  getFSPharmCompanies() {
    return this.pharmCompanies;
  }

  addPharmCompany(pharmCompany: PharmCompanies): any {
    return this.pharmCompaniesColection.add(pharmCompany); 
  }
}
