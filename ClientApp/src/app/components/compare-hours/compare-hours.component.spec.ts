import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareHoursComponent } from './compare-hours.component';

describe('CompareHoursComponent', () => {
  let component: CompareHoursComponent;
  let fixture: ComponentFixture<CompareHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
