import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HArticlesComponent } from './h-articles.component';

describe('HArticlesComponent', () => {
  let component: HArticlesComponent;
  let fixture: ComponentFixture<HArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
