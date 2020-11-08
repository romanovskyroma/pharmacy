import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VacancyService } from 'src/app/shared/services/vacancy.service';
import { IVacancy } from 'src/app/shared/interfaces/vacancy.interface';

@Component({
  selector: 'app-full-vacancy',
  templateUrl: './full-vacancy.component.html',
  styleUrls: ['./full-vacancy.component.scss']
})
export class FullVacancyComponent implements OnInit {
  oneVacancy: IVacancy;

  constructor(public route: ActivatedRoute, public vacancySevice: VacancyService) { }

  ngOnInit(): void {
    this.getData();
  }
 
  getData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.vacancySevice.getOneVacancy(id).forEach(data => {
      this.oneVacancy = data;
      console.log(this.oneVacancy);
    })
  }


}
