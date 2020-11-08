import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HVoteComponent } from './h-vote.component';

describe('HVoteComponent', () => {
  let component: HVoteComponent;
  let fixture: ComponentFixture<HVoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HVoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
