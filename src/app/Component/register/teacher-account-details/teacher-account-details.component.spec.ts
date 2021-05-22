import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAccountDetailsComponent } from './teacher-account-details.component';

describe('TeacherAccountDetailsComponent', () => {
  let component: TeacherAccountDetailsComponent;
  let fixture: ComponentFixture<TeacherAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherAccountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
