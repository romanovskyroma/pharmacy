import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullResumeComponent } from './full-resume.component';

describe('FullResumeComponent', () => {
  let component: FullResumeComponent;
  let fixture: ComponentFixture<FullResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
