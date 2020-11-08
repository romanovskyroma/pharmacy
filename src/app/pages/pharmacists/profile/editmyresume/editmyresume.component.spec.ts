import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmyresumeComponent } from './editmyresume.component';

describe('EditmyresumeComponent', () => {
  let component: EditmyresumeComponent;
  let fixture: ComponentFixture<EditmyresumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmyresumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmyresumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
