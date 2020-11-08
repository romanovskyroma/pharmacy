import { Injectable } from '@angular/core';
import { IPharmacies } from '../interfaces/pharmacies.interface';
import { Pharmacies } from '../classes/pharmacies.model'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class PharmaciesService {
  pharmaciesColection: AngularFirestoreCollection<IPharmacies>;
  pharmacies: Observable<IPharmacies[]>;

  constructor(public firestore: AngularFirestore) {
    this.pharmaciesColection = this.firestore.collection<IPharmacies>('pharmacies');
    this.pharmacies = this.pharmaciesColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IPharmacies;
        return data;
      })
    })
  }

  getFSPharmacies() {
    return this.pharmacies;
  } 

  addPharmacy(pharmacy: IPharmacies): any {
    console.log(pharmacy);
    return this.pharmaciesColection.add(pharmacy);
  }



}


