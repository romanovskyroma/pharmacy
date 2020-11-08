import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPharmCompaniesComponent } from './admin-pharm-companies.component';

describe('AdminPharmCompaniesComponent', () => {
  let component: AdminPharmCompaniesComponent;
  let fixture: ComponentFixture<AdminPharmCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPharmCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPharmCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
