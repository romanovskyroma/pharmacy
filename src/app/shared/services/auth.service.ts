import { Injectable } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { AngularFireAuth } from "@angular/fire/auth";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);
  public checkAdminLogin: boolean;
  public checkUserLogin: boolean;
  public colllection: string; 
  public route: string;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) { }

  public loggedInStatus = JSON.parse(localStorage.getItem("loggedIn") || "false");

  getUserLS(): any {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  } 

  setLoginStatus(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("user", JSON.stringify(value));
  }

  getLoginStatus() {
    return JSON.parse(localStorage.getItem("loggedIn") || this.loggedInStatus.toString());
  }
 
  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      ); 
    });
  }

  doTwitterLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.TwitterAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      this.afAuth.auth.signInWithPopup(provider).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doRegister(value: any): any {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password)
        .then((res) => {
          resolve(res);
          console.log(res.user.email);
        },
          (err) => {
            return reject(err);
          });
    });
  }

  doLogin(value: any): Promise<any> {
    console.log(value);
    console.log(value.email);
    console.log(value.password);
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(value.email, value.password)
        .then((res) => {
          // resolve(res);
          console.log(res);
          console.log(res.user.email);
          this.currentUser = '';
          this.firestore.collection(this.colllection).ref.where("email", "==", res.user.email)
            .onSnapshot((snap) => {
              snap.forEach((userRef) => {
                console.log(userRef);
                console.log("userRef", userRef.data());
                this.currentUser = userRef.data();
                console.log(this.currentUser);
                this.setLoginStatus(this.currentUser);
                if (userRef.data().role !== "admin") {
                  this.checkUserLogin = true;
                  console.log(this.checkUserLogin);
                  console.log(this.currentUser);
                  this.router.navigate([this.route]);
                } else {
                  this.checkAdminLogin = true;
                  console.log(this.checkAdminLogin);
                  this.router.navigate(["/admin"]);
                }
                this.userStatusChanges.next('user');

              });
              resolve(res);
            });
        })
        .catch(err => reject(err));
    });
  }

  doLogout() {
    localStorage.setItem("loggedIn", "false");
    localStorage.removeItem('user');
    this.currentUser = '';
    this.userStatusChanges.next('user');
    this.router.navigate(['/home']);
  }

  isAdminLogin(): boolean {
    return this.checkAdminLogin;
  }

  isUserLogin(): boolean {
    return this.checkUserLogin;
  }
}
