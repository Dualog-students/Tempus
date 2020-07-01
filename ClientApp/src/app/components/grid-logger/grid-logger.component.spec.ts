import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridLoggerComponent } from './grid-logger.component';

describe('GridLoggerComponent', () => {
  let component: GridLoggerComponent;
  let fixture: ComponentFixture<GridLoggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridLoggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridLoggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
