import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmaceuticalCompaniesComponent } from './pharmaceutical-companies.component';

describe('PharmaceuticalCompaniesComponent', () => {
  let component: PharmaceuticalCompaniesComponent;
  let fixture: ComponentFixture<PharmaceuticalCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmaceuticalCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmaceuticalCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
