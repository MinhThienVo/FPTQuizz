import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingJoinComponent } from './setting-join.component';

describe('SettingJoinComponent', () => {
  let component: SettingJoinComponent;
  let fixture: ComponentFixture<SettingJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
