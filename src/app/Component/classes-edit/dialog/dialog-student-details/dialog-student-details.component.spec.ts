import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStudentDetailsComponent } from './dialog-student-details.component';

describe('DialogStudentDetailsComponent', () => {
  let component: DialogStudentDetailsComponent;
  let fixture: ComponentFixture<DialogStudentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogStudentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogStudentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
