import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHoursComponent } from './register-hours.component';

describe('RegisterHoursComponent', () => {
  let component: RegisterHoursComponent;
  let fixture: ComponentFixture<RegisterHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
