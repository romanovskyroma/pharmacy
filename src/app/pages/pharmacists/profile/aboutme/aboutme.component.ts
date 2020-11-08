import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IProvisor } from 'src/app/shared/interfaces/provisor.interface';
import { UsersService } from 'src/app/shared/services/users.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss']
}) 
export class AboutmeComponent implements OnInit {
  // userID: string;
  user: IProvisor;
  userData: IProvisor;

  constructor(public usersService: UsersService, public authService: AuthService) {
    this.user = this.authService.getUserLS();
    console.log(this.user.uid); 
    // this.usersService.getProvisorDocForUid(this.user.uid);
  }

  ngOnInit(): void {
    this.usersService.getProvisorDocForUid(this.user.uid)
      .then((res) => {
        this.userData = this.usersService.provisorDoc;
        console.log(this.userData.lastName);
      })
  }


}
