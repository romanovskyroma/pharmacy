import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { IProvisor } from 'src/app/shared/interfaces/provisor.interface';

@Component({
  selector: 'app-editaboutme',
  templateUrl: './editaboutme.component.html',
  styleUrls: ['./editaboutme.component.scss']
})

export class EditaboutmeComponent implements OnInit {
  profileForm = this.fb.group({
    firstName: [''],
    secondName: ['', Validators.required],
    lastName: [''],
    phone: ['', Validators.pattern('[0-9]{10,}')],
    // phone: ['', Validators.pattern('^\+?3?8?(0[\s\.-]\d{2}[\s\.-]\d{3}[\s\.-]\d{2}[\s\.-]\d{2})$')],
    education: this.fb.group({
      university: [''],
      faculty: [''],
      specialty: [''], 
      startYear: [''],
      endYear: [''],
    }),
    // company: this.fb.group({
    //   name: [''],
    //   adress: [''],
    //   position: [''],
    //   period: [''],
    //   city: [''],
    // })
  })

  year: Array<number> = [];
  user: any;
  userData: IProvisor;

  constructor(private fb: FormBuilder,
    public authService: AuthService,
    private usersService: UsersService,
    private route: Router) {
    this.user = this.authService.getUserLS();
    console.log(this.user.uid);
    console.log('constructor');
  }

  ngOnInit(): void {
    this.fnYear();
    this.usersService.getProvisorDocForUid(this.user.uid)
      .then((res) => {
        this.userData = this.usersService.provisorDoc;
        console.log(this.userData);
        
        this.profileForm.setValue({
          firstName: this.userData.firstName,
          secondName: this.userData.secondName,
          lastName: this.userData.lastName,
          phone: this.userData.phone,
          education: ({
            university: this.userData.education.university,
            faculty: this.userData.education.faculty,
            specialty: this.userData.education.specialty,
            startYear: this.userData.education.startYear,
            endYear: this.userData.education.endYear
          })
        });

      })
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.profileForm.value);
    const user = this.authService.getUserLS();
    console.log(user.uid);
    this.usersService.getProvisorDocForUid(user.uid)
      .then((res) => {
        const id = res;
        console.log(id);
        this.usersService.updateFSuser(id, this.profileForm.value);
        this.route.navigate(["/pharmacists/profile/aboutme"]);
      })

  }

  fnYear(): void {
    const date = new Date;
    let nowYear = date.getFullYear();
    for (let i = 1960; i <= nowYear; i++) {
      let y = i;
      this.year.push(y);
    }
    console.log(this.year);
  }





}
