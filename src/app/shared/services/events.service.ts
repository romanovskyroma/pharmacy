import { Injectable } from '@angular/core';
import { IEvent } from '../interfaces/event.interface';
import { Event } from '../classes/event.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
 
@Injectable({
  providedIn: 'root'
})
export class EventsService {
  eventsColection: AngularFirestoreCollection<Event>;
  events: Observable<IEvent[]>
  imgFS: Observable<any>;
  itemDoc: AngularFirestoreDocument<IEvent>;

  constructor(public firestore: AngularFirestore) {
    this.eventsColection = this.firestore.collection('events');
    this.events = this.eventsColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IEvent;
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    })
  }

  getFSEvents(): Observable<IEvent[]> {
    return this.events;
  }

  addFSEvent(event: Event): void {
    this.eventsColection.add(event);
  } 
 
  getOneEvent(id: string) {
    this.itemDoc = this.firestore.doc<IEvent>('events/' + id);
    const item = this.itemDoc.valueChanges();
    return item;
  }







}
