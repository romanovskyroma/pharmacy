import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HEventsComponent } from './h-events.component';

describe('HEventsComponent', () => {
  let component: HEventsComponent;
  let fixture: ComponentFixture<HEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
