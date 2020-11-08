import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FirebaseApp } from '@angular/fire/firebase.app.module';
import * as firebase from 'firebase';



import { Upload } from '../classes/upload.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private basePath = '/uploads';
  private uploadTask: firebase.storage.UploadTask;
  uploads: AngularFireList<any>;
  cacheMetadata: any = {
    cacheControl: 'public,max-age=2592000'
  };
  constructor(private firebase: AngularFireDatabase, @Inject(FirebaseApp) public firebaseApp: firebase.app.App) {

  }

  //Метод загрузки файла в бинарном виде
  pushUpload(upload: Upload) {
    const storageRef = this.firebaseApp.storage().ref();
    this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file, this.cacheMetadata);
    this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // загрузка в процессе
        upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        // ошибка при загрузке
        console.warn(error);
      },
      () => {
        // загрузка успешна
        upload.url = this.uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.saveFileData(upload);
      }
    );
    return this.uploadTask;
  }

  // Метод записи данных о загрузке в базу firebase
  private saveFileData(upload: Upload) {
    this.firebase.list(`${this.basePath}/`).push(upload);
  }

  //Метод удаления загруженного файла
  deleteUpload(upload: Upload) {
    this.deleteFileData(upload.$key)
      .then(() => {
        this.deleteFileStorage(upload.name);
      })
      .catch(error => console.log(error));
  }
  // Удаление данных о загрузке из базы firebase
  private deleteFileData(key: string) {
    return this.firebase.list(`${this.basePath}/`).remove(key);
  }
  // Удаление файла из хранилища firebase
  private deleteFileStorage(name: string) {
    const storageRef = this.firebaseApp.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }





}
