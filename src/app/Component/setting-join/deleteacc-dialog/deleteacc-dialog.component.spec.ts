import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteaccDialogComponent } from './deleteacc-dialog.component';

describe('DeleteaccDialogComponent', () => {
  let component: DeleteaccDialogComponent;
  let fixture: ComponentFixture<DeleteaccDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteaccDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteaccDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
