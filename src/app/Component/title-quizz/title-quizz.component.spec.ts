import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleQuizzComponent } from './title-quizz.component';

describe('TitleQuizzComponent', () => {
  let component: TitleQuizzComponent;
  let fixture: ComponentFixture<TitleQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleQuizzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
