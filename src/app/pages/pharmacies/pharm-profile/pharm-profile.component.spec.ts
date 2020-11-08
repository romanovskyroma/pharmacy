import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmProfileComponent } from './pharm-profile.component';

describe('PharmProfileComponent', () => {
  let component: PharmProfileComponent;
  let fixture: ComponentFixture<PharmProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
