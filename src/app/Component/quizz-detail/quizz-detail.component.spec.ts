import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzDetailComponent } from './quizz-detail.component';

describe('QuizzDetailComponent', () => {
  let component: QuizzDetailComponent;
  let fixture: ComponentFixture<QuizzDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizzDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
