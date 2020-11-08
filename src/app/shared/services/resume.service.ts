import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { snapshotChanges } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { resolve } from 'promise';
import { Observable } from 'rxjs-compat';
import 'rxjs/add/operator/map';
import { IResume } from '../interfaces/resume.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  resumeColection: AngularFirestoreCollection<IResume>;
  allResume: Observable<IResume[]>;
  allMyResume: Array<any> = [];
  allMyResumeID: Array<any> = [];
  itemDoc: AngularFirestoreDocument<IResume>;

  constructor(public firestore: AngularFirestore, public authService: AuthService) {
    const user = this.authService.getUserLS();
    this.resumeColection = this.firestore.collection('resume');
    this.allResume = this.resumeColection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as IResume;
        const id = a.payload.doc.id;
        console.log(data);
        console.log(id);
        return { id, ...data };
      })
    });
  }

  getAllResume() {
    return this.allResume;
  }

  addResume(resume: IResume): void {
    this.resumeColection.add(resume);
  }

  getOneResume(id: string): any {
    this.itemDoc = this.firestore.doc<IResume>('resume/' + id);
    const item = this.itemDoc.valueChanges();
    return item;
  }


  getResumeForUid(uid: string): any {
    this.resumeColection.ref.where("uid", "==", uid).onSnapshot((snap) => {
      return snap.forEach((resumeRef) => {
        const resume = resumeRef.data() as IResume;
        const resumeID = resumeRef.id;
        resume['id'] = resumeID;
        console.log(resume);
        console.log(resumeID);
        console.log(this.allMyResumeID);
        // return resume;
        if (!this.allMyResumeID.includes(resumeID)) {
          // this.allMyResume = [];
          this.allMyResumeID.push(resumeID);
          this.allMyResume.push(resume);
        }
      })
    })
  }

  updateResume(id: string, resume: IResume) {
    const doc = this.resumeColection.doc(id);
    return doc.update(resume);
  }




}
