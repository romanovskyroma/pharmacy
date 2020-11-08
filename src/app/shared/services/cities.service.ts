import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import { ICity } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  citiesColection: AngularFirestoreCollection;
  cities: ICity[];

  constructor(public firestore: AngularFirestore, public http: HttpClient) {
    this.citiesColection = this.firestore.collection('cities');
  }

  getCitiesJson() {
    return this.http.get('assets/json/uaCities.json')
  }

  addFSCities(city) {
    this.citiesColection.add(city);
  }


}
