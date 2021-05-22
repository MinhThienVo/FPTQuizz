import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleLessonComponent } from './title-lesson.component';

describe('TitleLessonComponent', () => {
  let component: TitleLessonComponent;
  let fixture: ComponentFixture<TitleLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
