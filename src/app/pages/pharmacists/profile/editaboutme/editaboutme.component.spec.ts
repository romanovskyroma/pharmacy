import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaboutmeComponent } from './editaboutme.component';

describe('EditaboutmeComponent', () => {
  let component: EditaboutmeComponent;
  let fixture: ComponentFixture<EditaboutmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditaboutmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditaboutmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
