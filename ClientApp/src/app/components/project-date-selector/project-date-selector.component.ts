import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-date-selector',
  templateUrl: './project-date-selector.component.html',
  styleUrls: ['./project-date-selector.component.scss'],
})
export class ProjectDateSelectorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onBack() {
    console.log('onBack');
  }
  onNext() {
    console.log('onNext');
  }
  onDay() {
    console.log('onDay');
  }
  onWorkWeek() {
    console.log('onWorkWeek');
  }
  onWeek() {
    console.log('onWeek');
  }
}
