import { Component, OnInit } from '@angular/core';
import { PharmCompaniesService } from 'src/app/shared/services/pharm-companies.service';
import { IPharmCompanies } from 'src/app/shared/interfaces/pharmcompanies.interface';

@Component({
  selector: 'app-admin-pharm-companies',
  templateUrl: './admin-pharm-companies.component.html',
  styleUrls: ['./admin-pharm-companies.component.scss']
})
export class AdminPharmCompaniesComponent implements OnInit {
  pharmCompanies: IPharmCompanies[];
  
  constructor(public pharmCompaniesService: PharmCompaniesService) { }

  ngOnInit(): void {
    this.getPharmCompanies();
  }

  private getPharmCompanies(): void {
    this.pharmCompaniesService.getFSPharmCompanies().subscribe((pharmCompanies) => {
      this.pharmCompanies = pharmCompanies;
    });
  }

}
