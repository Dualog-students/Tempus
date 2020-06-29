import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDateSelectorComponent } from './project-date-selector.component';

describe('ProjectDateSelectorComponent', () => {
  let component: ProjectDateSelectorComponent;
  let fixture: ComponentFixture<ProjectDateSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDateSelectorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDateSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
