import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTogglerComponent } from './nav-toggler.component';

describe('NavTogglerComponent', () => {
  let component: NavTogglerComponent;
  let fixture: ComponentFixture<NavTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
