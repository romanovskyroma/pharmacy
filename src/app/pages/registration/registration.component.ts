import { Component, OnInit } from "@angular/core";
import { IUser } from "src/app/shared/interfaces/users.interface";
import { UsersService } from "../../shared/services/users.service";
import { PharmaciesService } from "src/app/shared/services/pharmacies.service";
import { PharmCompaniesService } from "src/app/shared/services/pharm-companies.service";
import { AuthService } from "src/app/shared/services/auth.service";
import { IProvisor } from "src/app/shared/interfaces/provisor.interface";
import { IPharmacies } from "src/app/shared/interfaces/pharmacies.interface";
import { IPharmCompanies } from "src/app/shared/interfaces/pharmcompanies.interface";
import { Router } from '@angular/router';
import { CitiesService } from 'src/app/shared/services/cities.service';
import { ICity } from 'src/app/shared/interfaces/city.interface';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  providers: [UsersService, PharmaciesService, PharmCompaniesService],
})

export class RegistrationComponent implements OnInit {
  provisor: boolean;
  pharmacy: boolean;
  pharmcompany: boolean;
  passwordRepeat: string;
  users: IUser[] = [];
  pharmacies: IPharmacies[];
  pharmCompanies: IPharmCompanies[];
  newProvisor: IProvisor = {
    email: "",
    password: "",
  };
  
  newPharm: IPharmacies = {
    uid: '',
    pharmacyName: '',
    email: '',
    password: '',
    pharmacyRegion: '',
    pharmacyCity: '',
    pharmacyAdress: '',
    role: ''
  };

  newPharmCompany: IPharmCompanies = {
    pharmCompanyName: "",
    email: "",
    password: "",
    pharmCompanyCity: "",
    pharmCompanyAdress: "",
    uid: '',
    role: ''
  };

  regDone: boolean;
  public currentUser: any;
  error: string;
  errorMessage: string;
  successMessage: string;
  city: ICity = {
    id: '',
    cityname: '',
    region: '',
  };
  arrCities: any = [];
  arrRegion: Array<string> = [];
  arrCitiesOfRegion: Array<string> = [];
  keywordCity = 'cityname';
  keywordRegion = 'region';

  constructor(
    public userService: UsersService,
    public pharmacyService: PharmaciesService,
    public pharmCompaniesService: PharmCompaniesService,
    private authService: AuthService,
    private router: Router,
    public citiesService: CitiesService
  ) {
    this.error = null;
  }


  ngOnInit(): void {
    // this.getUsers();
    // this.getPharmacies();
    // this.getPharmCompanies();
    
    let promise = new Promise((resolve, reject) => {
      this.citiesService.getCitiesJson().subscribe(data => {
        this.arrCities = data['city'];
        resolve(this.arrCities);
      });
    })
    promise.then(value => {
      this.arrCities = value;
      this.arrCities.forEach((element: ICity) => {
        if (!this.arrRegion.includes(element.region)) {
          this.arrRegion.push(element.region);
        }
      });
    });
  }

  choose(event: { target: { value: string } }): void {
    this.provisor = false;
    this.pharmacy = false;
    this.pharmcompany = false;

    if (event.target.value == "provisor") {
      this.provisor = true;
    } else if (event.target.value == "pharmacy") {
      this.pharmacy = true;
    } else if (event.target.value == "pharmcompany") {
      this.pharmcompany = true;
    }
  }

  private getUsers(): void {
    this.userService.getFSUsers().subscribe((users) => {
      this.users = users;
    });
  }

  private getPharmacies(): void {
    this.pharmacyService.getFSPharmacies().subscribe((pharmacies) => {
      this.pharmacies = pharmacies;
    });
  }

  private getPharmCompanies(): void {
    this.pharmCompaniesService.getFSPharmCompanies().subscribe((pharmCompanies) => {
      this.pharmCompanies = pharmCompanies;
    });
  }

  addProvisor(user: IProvisor): void {
    console.log(user);
    const role: string = "provisor";
    this.authService.doRegister(user)
      .then(
        (res) => {
          console.log(res);
          console.log(res.user.email);
          console.log(res.user.uid);
          this.newProvisor = {
            email: res.user.email,
            uid: res.user.uid,
            role: role
          }
          this.userService.addUsers(this.newProvisor)
            .then((user) => {
              console.log(user);
              user.get().then((x) => {
                // return the user data
                console.log(x.data());
                console.log(user);
                this.currentUser = x.data();
                console.log(this.currentUser);
                this.authService.setLoginStatus(this.currentUser);
                this.authService.userStatusChanges.next('user');
                this.router.navigate(["/pharmacists/profile"]);
              });
            })
            .catch((err) => {
              console.log(err);
            });
          this.errorMessage = "";
          this.successMessage = "Your account has been created";
        },
        (err) => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        }
      );
    this.newProvisor.email = "";
    this.newProvisor.password = "";
    this.passwordRepeat = "";
  }

  addPharmacy(): void {
    console.log(this.newPharm);
    const role: string = "pharmacy";
    this.authService.doRegister(this.newPharm)
      .then((res) => {
        console.log(res);
        this.newPharm.uid = res.user.uid;
        this.newPharm.role = role;
        console.log(this.newPharm);

        this.pharmacyService.addPharmacy(this.newPharm)
          .then((user: any) => {
            console.log(user);
            user.get().then((x) => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              console.log(this.currentUser);
              this.authService.setLoginStatus(this.currentUser);
              this.authService.userStatusChanges.next('user');
              this.router.navigate(["/pharmacies/pharm-profile"]);
            });
          })
          .catch((err: any) => {
            console.log(err);
          });
        this.formReset();
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
      },
        (err) => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = "";
        }
      );
  }

  addPharmCompany(): void {
    const role: string = "pharm-comp";
    this.authService.doRegister(this.newPharmCompany)
      .then((res) => {
        console.log(res.user.uid);
        this.newPharmCompany.uid = res.user.uid;
        this.newPharmCompany.role = role;
        console.log(this.newPharmCompany);

        this.pharmCompaniesService.addPharmCompany(this.newPharmCompany)
          .then((user: any) => {
            console.log(user);
            user.get().then((x) => {
              //return the user data
              console.log(x.data());
              this.currentUser = x.data();
              console.log(this.currentUser);
              this.authService.setLoginStatus(this.currentUser);
              this.authService.userStatusChanges.next('user');
              this.router.navigate(["/pharmaceutical-companies"]);
              this.newPharmCompany.email = "";
              this.newPharmCompany.password = "";
              this.newPharmCompany.pharmCompanyAdress = "";
              this.newPharmCompany.pharmCompanyCity = "";
              this.newPharmCompany.pharmCompanyName = "";
            });
          })
          .catch((err: any) => {
            console.log(err);
          });
      })
  }

  formReset(): void {
    this.newPharm.pharmacyName = "";
    this.newPharm.email = "";
    this.newPharm.password = "";
    this.passwordRepeat = "";
    this.newPharm.pharmacyRegion = "";
    this.newPharm.pharmacyCity = "";
    this.newPharm.pharmacyAdress = "";
  }

  removeError() {
    this.error = null;
  }

  selectEvent(region) {
    // do something with selected item
    this.newPharm.pharmacyCity = '';
    this.newPharmCompany.pharmCompanyCity = '';
    this.arrCitiesOfRegion = [];
    this.arrCities.forEach((city: ICity) => {
      if (city.region == region) {
        this.arrCitiesOfRegion.push(city.cityname);
      }
    });
  }

  onChangeSearch(search: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.

  }

  onFocused(e) {
    // do something
  }


}
