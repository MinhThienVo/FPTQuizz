import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteClassComponent } from './dialog-delete-class.component';

describe('DialogDeleteClassComponent', () => {
  let component: DialogDeleteClassComponent;
  let fixture: ComponentFixture<DialogDeleteClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
