import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/users.interface';
import { User } from 'src/app/shared/classes/user.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { IProvisor } from '../interfaces/provisor.interface';
import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  usersColection: AngularFirestoreCollection<IUser>;
  users: Observable<IUser[]>;
  provisorDoc: IProvisor;
  provisorDocID: string;
  itemDoc: AngularFirestoreDocument<any>;

  constructor(public firestore: AngularFirestore, public afAuth: AngularFireAuth) {
    this.usersColection = this.firestore.collection('provisors');
    // console.log(this.usersColection);
    this.users = this.usersColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IUser;
        const id = a.payload.doc.id;
        // console.log(data);
        // console.log(id);
        return data;
      })
    })
    // console.log(this.users);

  }

  getFSUsers(): Observable<IUser[]> {
    return this.users;
  }

  addUsers(user: IUser): any {
    console.log(user);
    return this.usersColection.add(user);
  }

  updateFSuser(id: string, provisor: any) {
    const doc = this.usersColection.doc(id);
    return doc.update(provisor);
  }

  getUserForID(id:string): any {
    this.itemDoc = this.firestore.doc<IProvisor>('provisors/' + id);
    const item = this.itemDoc.valueChanges();
    console.log(item);
    return item;
  }

  getProvisorDocForUid(uid: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersColection.ref.where("uid", "==", uid).onSnapshot((snap) => {
        console.log(snap);
        snap.forEach((resumeRef) => {
          this.provisorDoc = resumeRef.data() as IProvisor;
          this.provisorDocID = resumeRef.id;
          console.log(this.provisorDoc);
          console.log(this.provisorDocID);
          return this.provisorDocID;
        })
        resolve(this.provisorDocID);
      })
    })
  }




}
