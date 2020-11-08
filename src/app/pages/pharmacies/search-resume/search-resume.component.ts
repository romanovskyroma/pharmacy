import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/shared/classes/resume.model';
import { ResumeService } from 'src/app/shared/services/resume.service';
import { IResume } from 'src/app/shared/interfaces/resume.interface';

@Component({
  selector: 'app-search-resume',
  templateUrl: './search-resume.component.html',
  styleUrls: ['./search-resume.component.scss']
})
export class SearchResumeComponent implements OnInit {
  allResume: Resume[];
  resFilter: any = { position: '', city: '' };
  arrCity: Array<string> = [];
  arrPos: Array<string> = [];

  constructor(public resumeService: ResumeService) { }

  ngOnInit(): void {
    this.resumeService.getAllResume().subscribe(resume => {
      this.allResume = resume;
      console.log(this.allResume);
      this.checkCityName(this.allResume);
      let tRes = typeof(this.allResume)
      console.log(tRes);       
      this.checkPosName(this.allResume); 
    })

  }

  checkCityName(cities: IResume[]) {
    cities.forEach(element => {
      if (!this.arrCity.includes(element.city)) {
        this.arrCity.push(element.city)
      }
    });
  }

  checkPosName(pos: any[]) {
    pos.forEach(element => {
      if (!this.arrPos.includes(element.position)) {
        this.arrPos.push(element.position)
      }
    });
  }



}
