import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAccountDetailsComponent } from './student-account-details.component';

describe('StudentAccountDetailsComponent', () => {
  let component: StudentAccountDetailsComponent;
  let fixture: ComponentFixture<StudentAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAccountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
