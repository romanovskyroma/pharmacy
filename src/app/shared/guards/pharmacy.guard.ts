import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PharmacyGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkRoleLogin();
    // return true;
  }

  checkRoleLogin(): boolean {
    this.authService.getUserLS();
    if (this.authService.getLoginStatus() == true && this.authService.getUserLS().role == 'pharmacy') {
      return true;
    } else {
      this.router.navigate(['registration']);
      // this.header.modShow();
      console.log('ввійдіть як аптека');
      return false
    }
  }

}
