import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerDetailsComponent } from './logger-details.component';

describe('LoggerDetailsComponent', () => {
  let component: LoggerDetailsComponent;
  let fixture: ComponentFixture<LoggerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
