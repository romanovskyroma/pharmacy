import { Component, OnInit } from '@angular/core';
import { ResumeService } from 'src/app/shared/services/resume.service';
import { IResume } from 'src/app/shared/interfaces/resume.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  allResume: IResume[];
  resume: IResume = {
    uid: '',
    position: '',
    city: '',
    salery: null,
    univercity: '',
    experienceYears: null, 
    experience: '',
    aboutMySelf: '',
  }

  constructor(public resumeService: ResumeService, public authService: AuthService) { }

  ngOnInit(): void {
    // this.resumeService.getAllResume().subscribe(resume => {
    //   this.allResume = resume;
    //   // console.log(this.allResume);
    // })
  }
 
  addResume(): void {
    const user = this.authService.getUserLS();
    console.log(user.uid);
    this.resume.uid = user.uid;
    this.resumeService.addResume(this.resume);
  }

}
