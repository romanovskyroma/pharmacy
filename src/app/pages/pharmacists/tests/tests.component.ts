import { Component, OnInit } from '@angular/core';
import { ICity } from 'src/app/shared/interfaces/city.interface';
import { CitiesService } from 'src/app/shared/services/cities.service';
import { resolve } from 'dns';

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {
    

    constructor(public citiesService: CitiesService) { }

    ngOnInit(): void {
       
    }

    

}
