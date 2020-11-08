import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PharmacistsComponent } from './pages/pharmacists/pharmacists.component';
import { ArticlesComponent } from './pages/pharmacists/articles/articles.component';
import { PharmaciesComponent } from './pages/pharmacies/pharmacies.component';
import { PharmaceuticalCompaniesComponent } from './pages/pharmaceutical-companies/pharmaceutical-companies.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { TestsComponent } from './pages/pharmacists/tests/tests.component';
import { VacanciesComponent } from './pages/pharmacists/vacancies/vacancies.component';
import { ResumeComponent } from './pages/pharmacists/resume/resume.component';
import { ProfileComponent } from './pages/pharmacists/profile/profile.component';
import { EventsComponent } from './pages/pharmaceutical-companies/events/events.component';
import { CreatetestComponent } from './pages/pharmaceutical-companies/createtest/createtest.component';
import { VoteComponent } from './pages/pharmaceutical-companies/vote/vote.component';
import { StatisticComponent } from './pages/pharmaceutical-companies/statistic/statistic.component';
import { HEventsComponent } from './pages/home/h-events/h-events.component';
import { HArticlesComponent } from './pages/home/h-articles/h-articles.component';
import { HVoteComponent } from './pages/home/h-vote/h-vote.component';
import { SearchResumeComponent } from './pages/pharmacies/search-resume/search-resume.component';
import { CreateVacancyComponent } from './pages/pharmacies/create-vacancy/create-vacancy.component';
import { AdvertisementComponent } from './pages/pharmacies/advertisement/advertisement.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { AdminPharmaciesComponent } from './admin/admin-pharmacies/admin-pharmacies.component';
import { AdminPharmCompaniesComponent } from './admin/admin-pharm-companies/admin-pharm-companies.component';
import { AdminArticlesComponent } from './admin/admin-articles/admin-articles.component';
import { FullArticleComponent } from './pages/home/full-article/full-article.component';
import { EventDetailsComponent } from './pages/home/h-events/event-details/event-details.component';
import { PharmProfileComponent } from './pages/pharmacies/pharm-profile/pharm-profile.component';
import { MyresumeComponent } from './pages/pharmacists/profile/myresume/myresume.component';

import { PharmacistsGuard } from "./shared/guards/pharmacists.guard";
import { PharmacyGuard } from './shared/guards/pharmacy.guard';
import { PharmCompanyGuard } from './shared/guards/pharm-company.guard';
import { FullVacancyComponent } from './pages/pharmacists/vacancies/full-vacancy/full-vacancy.component';
import { AboutmeComponent } from './pages/pharmacists/profile/aboutme/aboutme.component';
import { EditaboutmeComponent } from './pages/pharmacists/profile/editaboutme/editaboutme.component';
import { FullResumeComponent } from './pages/pharmacies/full-resume/full-resume.component';
import { EditmyresumeComponent } from './pages/pharmacists/profile/editmyresume/editmyresume.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'admin', component: AdminComponent, children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      { path: 'admin-articles', component: AdminArticlesComponent },
      { path: 'users', component: UsersComponent },
      { path: 'admin-pharmacies', component: AdminPharmaciesComponent },
      { path: 'admin-pharm-companies', component: AdminPharmCompaniesComponent },
    ]
  },
  {
    path: 'home', component: HomeComponent, children: [
      { path: '', redirectTo: 'h-articles', pathMatch: 'full' },
      { path: 'h-events', component: HEventsComponent },
      { path: 'event/:id', component: EventDetailsComponent },
      { path: 'h-articles', component: HArticlesComponent },
      { path: 'h-articles/:id', component: FullArticleComponent },
      { path: 'h-vote', component: HVoteComponent },

    ]
  },
  {
    path: 'pharmacists', component: PharmacistsComponent, canActivate: [PharmacistsGuard], children: [
      { path: '', redirectTo: 'articles', pathMatch: 'full' },
      { path: 'articles', component: ArticlesComponent },
      { path: 'tests', component: TestsComponent },
      { path: 'vacancies', component: VacanciesComponent },
      { path: 'vacancies/:id', component: FullVacancyComponent },
      { path: 'resume', component: ResumeComponent },
      {
        path: 'profile', component: ProfileComponent, children: [
          { path: '', redirectTo: 'aboutme', pathMatch: 'full' },
          { path: 'myresume', component: MyresumeComponent },
          { path: 'aboutme', component: AboutmeComponent },
          { path: 'editaboutme', component: EditaboutmeComponent },
          { path: 'editmyresume/:id', component: EditmyresumeComponent }
        ]
      },
    ]
  },
  {
    path: 'pharmacies', component: PharmaciesComponent, canActivate: [PharmacyGuard], children: [
      { path: '', redirectTo: 'pharm-profile', pathMatch: 'full' },
      { path: 'create-vacancy', component: CreateVacancyComponent },
      { path: 'search-resume', component: SearchResumeComponent },
      { path: 'search-resume/:id', component: FullResumeComponent },
      { path: 'advertisement', component: AdvertisementComponent },
      { path: 'pharm-profile', component: PharmProfileComponent },
    ]
  },
  {
    path: 'pharmaceutical-companies', component: PharmaceuticalCompaniesComponent, canActivate: [PharmCompanyGuard], children: [
      { path: '', redirectTo: 'events', pathMatch: 'full' },
      { path: 'events', component: EventsComponent },
      { path: 'createtest', component: CreatetestComponent },
      { path: 'vote', component: VoteComponent },
      { path: 'statistic', component: StatisticComponent },
    ]
  },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
