import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { faEdit, fasCut } from "@rinminase/ng-fortawesome";
import { reject } from 'promise';
import { finalize } from 'rxjs/operators';
import { IProvisor } from 'src/app/shared/interfaces/provisor.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isShadow: string = '';
  faEdit = faEdit;
  faCut = fasCut;
  edit: boolean = false;
  cut: boolean = false;
  file: FileList | null;
  fileName: string;
  imageUrl: string;
  myColorEdit: string = 'black';
  myColorCut: string = 'black';
  user: IProvisor;
  userData: IProvisor;

  constructor(public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public usersService: UsersService,
    public authService: AuthService) {
    this.user = this.authService.getUserLS();
    console.log(this.user.uid);
  }

  ngOnInit(): void {
    this.usersService.getProvisorDocForUid(this.user.uid)
      .then((res) => {
        this.userData = this.usersService.provisorDoc;
        console.log(this.userData.firstName);
        console.log(this.userData.photoProfilePath);
        this.imageUrl = this.userData.photoProfilePath;
      })
  }

  mouseover() {
    this.isShadow = 'rgba(0, 0, 0, 0.5)';
    console.log(this.isShadow);
    this.edit = true;
    this.cut = true;
  }

  mouseleave() {
    this.isShadow = '';
    this.edit = false;
    this.cut = false;
  }

  chooseFile($event) {
    console.log($event);
    this.fileName = $event.target.files[0].name;
    this.file = $event.target.files[0];
    console.log(this.file);
    console.log('addPhoto');
    const userDocId = this.usersService.provisorDocID;
    let usersProfilePhoto = this.firestore.collection('usersProfilePhoto').ref.doc(userDocId);
    const fileRef = this.storage.ref(usersProfilePhoto.path);
    console.log(fileRef);
    let task = this.storage.upload(usersProfilePhoto.path, this.file);
    console.log(task);

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().toPromise().then((url) => {
          this.imageUrl = url;
          this.firestore.collection('provisors').ref.doc(userDocId).update({
            photoProfilePath: this.imageUrl
          })
        })
      })
    )
      .subscribe();
    task.then((res) => {
      console.log(res);
      console.log(`ссилка на фото додана в базу ${res}`);

    })
  }

  delPhoto() {
    console.log('del Photo');
    const userDocId = this.usersService.provisorDocID;
    let delPhotoPromise = new Promise((resolve, reject) => {
      this.firestore.collection('provisors').ref.doc(userDocId).update({
        photoProfilePath: ''
      })
      resolve('Ваше фото видалене');
    })

    delPhotoPromise.then((res) => {
      console.log(res);
      this.imageUrl = '';
      console.log(this.imageUrl);
    })
    console.log(this.imageUrl);
  }




}
