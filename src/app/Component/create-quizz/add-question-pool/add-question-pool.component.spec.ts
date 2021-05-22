import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionPoolComponent } from './add-question-pool.component';

describe('AddQuestionPoolComponent', () => {
  let component: AddQuestionPoolComponent;
  let fixture: ComponentFixture<AddQuestionPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
