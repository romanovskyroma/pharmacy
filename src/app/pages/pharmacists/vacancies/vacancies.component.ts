import { Component, OnInit } from '@angular/core';
import { IVacancy } from 'src/app/shared/interfaces/vacancy.interface';
import { VacancyService } from 'src/app/shared/services/vacancy.service';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  vacancies: IVacancy[];
  resFilter: any = { position: '', city: '' };
  arrCity: Array<string> = [];
  arrPos: Array<string> = [];

  constructor(public vacancyService: VacancyService) { }

  ngOnInit(): void {
    this.vacancyService.getFSVacansies().subscribe(vacancy => {
      this.vacancies = vacancy;
      console.log(this.vacancies);
      this.checkCityName(this.vacancies);
      this.checkPosName(this.vacancies);
      console.log(this.resFilter);
    })
  }

  checkCityName(cities: IVacancy[]) {
    cities.forEach(element => {
      if (!this.arrCity.includes(element.city)) {
        this.arrCity.push(element.city)
      }
    });
  }

  checkPosName(pos: IVacancy[]) {
    pos.forEach(element => {
      if (!this.arrPos.includes(element.position)) {
        this.arrPos.push(element.position)
      }
    });
  }

  vacancyDetail(id) {
    console.log(id);

  }


}
