import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/shared/services/resume.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IResume } from 'src/app/shared/interfaces/resume.interface';

@Component({
  selector: 'app-myresume',
  templateUrl: './myresume.component.html',
  styleUrls: ['./myresume.component.scss']
})
export class MyresumeComponent implements OnInit {
  myResume: Array<string> = [];
  myResumeID: Array<string> = [];

  constructor(public resumeService: ResumeService, public authService: AuthService) {
  }

  ngOnInit(): any {
    this.getMyResume();
    this.myResume = this.resumeService.allMyResume;
    console.log(this.myResume);
    
  }

  getMyResume(): any {
    const user = this.authService.getUserLS();
    this.resumeService.getResumeForUid(user.uid);    
    return this.resumeService.allMyResume;
  }



}
