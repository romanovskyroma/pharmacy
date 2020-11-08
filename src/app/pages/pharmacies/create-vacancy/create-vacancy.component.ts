import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IVacancy } from 'src/app/shared/interfaces/vacancy.interface';
import { VacancyService } from 'src/app/shared/services/vacancy.service';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.scss']
})
export class CreateVacancyComponent implements OnInit {
  formData: IVacancy;
  year: string = 'років';

  constructor(private serviceVacancy: VacancyService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onYearChange(): void {
    console.log(this.formData.experienceYears);
    if(this.formData.experienceYears == 1)
    this.year = 'року'
    else 
    this.year = 'років'
  }

  addVacancy(f) {
    console.log(f.invalid);
    console.log(f);
    console.log(f.value);
    console.log(this.formData);
    this.serviceVacancy.addFSVacansy(this.formData);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.formData = {
      position: '',
      city: '',
      salery: null,
      experienceYears: null,
      skills: '',
      aboutCompany: ''
    }
  }

}
