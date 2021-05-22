import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionSaveComponent } from './collection-save.component';

describe('CollectionSaveComponent', () => {
  let component: CollectionSaveComponent;
  let fixture: ComponentFixture<CollectionSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionSaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
