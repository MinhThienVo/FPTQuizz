import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRollComponent } from './choose-roll.component';

describe('ChooseRollComponent', () => {
  let component: ChooseRollComponent;
  let fixture: ComponentFixture<ChooseRollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseRollComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
