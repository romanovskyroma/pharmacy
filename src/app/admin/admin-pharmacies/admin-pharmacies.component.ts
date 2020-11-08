import { Component, OnInit } from '@angular/core';
import { IPharmacies } from 'src/app/shared/interfaces/pharmacies.interface';
import { PharmaciesService } from 'src/app/shared/services/pharmacies.service';

@Component({
  selector: 'app-admin-pharmacies',
  templateUrl: './admin-pharmacies.component.html',
  styleUrls: ['./admin-pharmacies.component.scss']
})
export class AdminPharmaciesComponent implements OnInit {
  pharmacies: IPharmacies[];

  constructor(public pharmaciesService: PharmaciesService) { }

  ngOnInit(): void {
    this.getPharmacies();
  }

  private getPharmacies(): void {
    this.pharmaciesService.getFSPharmacies().subscribe((pharmacies) => {
      this.pharmacies = pharmacies;
    });
  }

}
