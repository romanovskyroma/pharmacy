import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from 'src/app/shared/services/resume.service';
import { IResume } from 'src/app/shared/interfaces/resume.interface';

@Component({
  selector: 'app-full-resume',
  templateUrl: './full-resume.component.html',
  styleUrls: ['./full-resume.component.scss']
})
export class FullResumeComponent implements OnInit {
  oneResume: IResume;

  constructor(public route: ActivatedRoute, public resumeSevice: ResumeService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.resumeSevice.getOneResume(id).forEach(data => {
      this.oneResume = data;
      console.log(this.oneResume);
    })
  }

}
