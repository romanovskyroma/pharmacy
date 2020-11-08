import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { IUser } from 'src/app/shared/interfaces/users.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: IUser[];

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  } 

  private getUsers(): void {
    this.usersService.getFSUsers().subscribe((users) => {
      this.users = users;
    });
  }

}
