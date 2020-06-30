import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-date-selector',
  templateUrl: './project-date-selector.component.html',
  styleUrls: ['./project-date-selector.component.scss'],
})
export class ProjectDateSelectorComponent implements OnInit {
  @Input() numDays: number;
  @Output() numDaysChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {
    this.onWeek();
  }

  onBack() {
    console.log('onBack');
  }
  onNext() {
    console.log('onNext');
  }
  onDay() {
    console.log('onDay');
    this.numDays = 1;
    this.numDaysChange.emit(this.numDays);
  }
  onWorkWeek() {
    console.log('onWorkWeek');
    this.numDays = 5;
    this.numDaysChange.emit(this.numDays);
  }
  onWeek() {
    console.log('onWeek');
    this.numDays = 7;
    this.numDaysChange.emit(this.numDays);
  }
}
