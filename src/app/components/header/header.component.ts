import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
  modalShow: boolean = true;
  email: string;
  password: string;
  logReg: boolean;
  logOut: boolean;
  hello: string;
  role: string;
  errMes: string = 'err';

  constructor(public authService: AuthService) { }
 
  ngOnInit(): void {
    this.authService.userStatusChanges.subscribe(x => {
      // console.log(x);
      const user = JSON.parse(localStorage.getItem('user'));
      if (user !== null) {
        this.logReg = false;
        this.logOut = true;
        this.hello = this.sayHello(user.email);
      } else {
        this.logReg = true;
        this.logOut = false;
      }
    })
  }

  go(): void {
    console.log('go push');
  }

  closeModal(): void {
    this.modalShow = true;
  }

  modShow(): void {
    this.errMes = '';
    this.modalShow = false;
  }

  loginUser(f: NgForm): any {
    console.log(f.value);
    console.log(f.value.role);
    this.role = f.value.role;
    if (f.value.role == 'provisor') {
      this.authService.colllection = 'provisors';
      this.authService.route = '/pharmacists/profile';
    } else if (f.value.role == 'pharmacy') {
      this.authService.colllection = 'pharmacies';
      this.authService.route = '/pharmacies/pharm-profile';
    } else if (f.value.role == 'pharm-comp') {
      this.authService.colllection = 'pharmCompanies';
      this.authService.route = '/pharmaceutical-companies';
    }

    this.authService.doLogin(f.value)
      .then((res) => { 
        console.log(res);
        console.log(this.authService.checkUserLogin);
        console.log(this.authService.currentUser);
        console.log(this.authService.currentUser.role);
        if (this.role != this.authService.currentUser.role && this.authService.currentUser.role != 'admin') {
          this.errMes = 'користувача з таким логіном не знайдено';
        } else {
          this.modalShow = true;
        }
      })
  }

  fbLogin(): void {
    this.authService.doFacebookLogin();
  }

  signOut(): void {
    this.authService.doLogout();
  }

  sayHello(user: string): string {
    let mes = 'Привіт, ' + user;
    return mes;
  }


}
