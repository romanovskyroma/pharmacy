import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { QuillModule } from 'ngx-quill'
import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { loaderConfig } from './preloader-config';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { PharmacistsComponent } from './pages/pharmacists/pharmacists.component';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { PharmaceuticalCompaniesComponent } from './pages/pharmaceutical-companies/pharmaceutical-companies.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ArticlesComponent } from './pages/pharmacists/articles/articles.component';
import { TestsComponent } from './pages/pharmacists/tests/tests.component';
import { VacanciesComponent } from './pages/pharmacists/vacancies/vacancies.component';
import { ResumeComponent } from './pages/pharmacists/resume/resume.component';
import { ProfileComponent } from './pages/pharmacists/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { EventsComponent } from './pages/pharmaceutical-companies/events/events.component';
import { CreatetestComponent } from './pages/pharmaceutical-companies/createtest/createtest.component';
import { VoteComponent } from './pages/pharmaceutical-companies/vote/vote.component';
import { StatisticComponent } from './pages/pharmaceutical-companies/statistic/statistic.component';
import { HEventsComponent } from './pages/home/h-events/h-events.component';
import { HArticlesComponent } from './pages/home/h-articles/h-articles.component';
import { HVoteComponent } from './pages/home/h-vote/h-vote.component';
import { CreateVacancyComponent } from './pages/pharmacies/create-vacancy/create-vacancy.component';
import { SearchResumeComponent } from './pages/pharmacies/search-resume/search-resume.component';
import { AdvertisementComponent } from './pages/pharmacies/advertisement/advertisement.component';
import { AdminPharmaciesComponent } from './admin/admin-pharmacies/admin-pharmacies.component';
import { AdminPharmCompaniesComponent } from './admin/admin-pharm-companies/admin-pharm-companies.component';
import { AdminArticlesComponent } from './admin/admin-articles/admin-articles.component';
import { FullArticleComponent } from './pages/home/full-article/full-article.component';
import { EventDetailsComponent } from './pages/home/h-events/event-details/event-details.component';
import { UsersService } from './shared/services/users.service';
import { PharmaciesService } from './shared/services/pharmacies.service';
import { PharmCompaniesService } from './shared/services/pharm-companies.service';
import { AuthService } from './shared/services/auth.service';
import { PharmProfileComponent } from './pages/pharmacies/pharm-profile/pharm-profile.component';
import { SortByDatePipe } from './shared/pipes/sort-by-date.pipe';
import { MyresumeComponent } from './pages/pharmacists/profile/myresume/myresume.component';
import { FullVacancyComponent } from './pages/pharmacists/vacancies/full-vacancy/full-vacancy.component';
import { AboutmeComponent } from './pages/pharmacists/profile/aboutme/aboutme.component';
import { EditaboutmeComponent } from './pages/pharmacists/profile/editaboutme/editaboutme.component';
import { FullResumeComponent } from './pages/pharmacies/full-resume/full-resume.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditmyresumeComponent } from './pages/pharmacists/profile/editmyresume/editmyresume.component';
import { FontAwesomeModule } from "@rinminase/ng-fortawesome";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PharmacistsComponent,
    PharmaciesComponent,
    PharmaceuticalCompaniesComponent,
    RegistrationComponent,
    ArticlesComponent,
    TestsComponent,
    VacanciesComponent,
    ResumeComponent,
    ProfileComponent,
    AdminComponent,
    UsersComponent,
    EventsComponent,
    CreatetestComponent,
    VoteComponent,
    StatisticComponent,
    HEventsComponent,
    HArticlesComponent,
    HVoteComponent,
    CreateVacancyComponent,
    SearchResumeComponent,
    AdvertisementComponent,
    AdminPharmaciesComponent,
    AdminPharmCompaniesComponent,
    AdminArticlesComponent,
    FullArticleComponent,
    EventDetailsComponent,
    PharmProfileComponent,
    SortByDatePipe,
    MyresumeComponent,
    FullVacancyComponent,
    AboutmeComponent,
    EditaboutmeComponent,
    FullResumeComponent,
    EditmyresumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFirestoreModule,
    FilterPipeModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule,
    AutocompleteLibModule,
    HttpClientModule,
    NgxPaginationModule,
    FontAwesomeModule
  ],
  providers: [UsersService, PharmaciesService, PharmCompaniesService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
