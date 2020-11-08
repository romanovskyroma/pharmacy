import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IResume } from 'src/app/shared/interfaces/resume.interface';
import { ResumeService } from 'src/app/shared/services/resume.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-editmyresume',
  templateUrl: './editmyresume.component.html',
  styleUrls: ['./editmyresume.component.scss']
})
export class EditmyresumeComponent implements OnInit {
  editResume: IResume;
  ResumeID: string;
  resumeForm: FormGroup = this.fb.group({
    position: [''],
    city: [''],
    salery: [''],
    univercity: [''],
    experienceYears: ['', Validators.pattern('[0-9]{1,2}')],
    experience: [''],
    aboutMySelf: ['']
  })


  constructor(private resumeService: ResumeService, private route: ActivatedRoute,
    public fb: FormBuilder, private userService: UsersService) {
      let univercityProf = this.userService.provisorDoc.education.university;
      console.log(univercityProf);
       
     }

  ngOnInit(): void {
    this.getResume().then((res) => {
      this.resumeForm.setValue({
        position: res.position,
        city: res.city,
        salery: res.salery,
        // univercity: res.univercity,
        univercity: this.userService.provisorDoc.education.university,
        experienceYears: res.experienceYears,
        experience: res.experience,
        aboutMySelf: res.aboutMySelf,
      })      
      console.log(this.resumeForm.value);
      console.log(this.resumeForm.valid);
    })
  }

  getResume(): Promise<IResume> {
    this.ResumeID = this.route.snapshot.paramMap.get('id');
    return new Promise((resolve, reject) => {
      this.resumeService.getOneResume(this.ResumeID).forEach((data: IResume) => {
        console.log(data);
        this.editResume = data;
        resolve(data);
      })
    })
  }

  updateResume() {
    console.log('update');
    console.log(this.resumeForm.value);
    console.log(this.ResumeID);
    this.resumeService.updateResume(this.ResumeID, this.resumeForm.value);
  }



}
