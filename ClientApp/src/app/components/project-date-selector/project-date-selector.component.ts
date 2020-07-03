import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { DatepickerComponent } from '@dualog/design-system';

@Component({
  selector: 'app-project-date-selector',
  templateUrl: './project-date-selector.component.html',
  styleUrls: ['./project-date-selector.component.scss'],
})
export class ProjectDateSelectorComponent implements OnInit {
  @ViewChild('datePicker') datePicker: DatepickerComponent;
  @Input() numDays: number;
  @Output() numDaysChange = new EventEmitter<number>();

  @Input() currentDate: number;
  @Output() currentDateChange = new EventEmitter<number>();

  @Input() selectedDate: number;
  @Output() selectedDateChange = new EventEmitter<number>();

  defaultCurrentDate = new Date();

  constructor() {}

  ngOnInit(): void {
    this.onWeek();
    this.setCurrentDate();
    //this.setSelectedDate();
  }

  onBack() {
    if (this.numDays === 1) {
      this.addDate(-1);
    } else {
      const add = 1 - new Date(this.selectedDate).getDay() - 7;
      this.addDate(add);
    }
  }

  onPicked(event) {
    this.setSelectedDate(event);
  }

  onCurrent() {
    this.setCurrentDate(new Date().getTime());
  }

  onNext() {
    if (this.numDays === 1) {
      this.addDate(1);
    } else {
      const add = 8 - new Date(this.selectedDate).getDay();
      this.addDate(add);
    }
  }

  addDate(num: number) {
    this.setSelectedDate(this.addDays(this.selectedDate, num));
  }

  setSelectedDate(date = new Date().getTime()) {
    console.log(['setSelectedDate', new Date(date)]);
    this.selectedDate = date;
    this.selectedDateChange.emit(this.selectedDate);
    this.datePicker?.writeValue(new Date(this.selectedDate));
  }

  setCurrentDate(date = new Date().getTime()) {
    this.currentDate = date;
    this.currentDateChange.emit(this.currentDate);
    // this.setSelectedDate(this.currentDate);
  }

  onDay() {
    this.numDays = 1;
    this.numDaysChange.emit(this.numDays);
  }
  onWorkWeek() {
    this.numDays = 5;
    this.numDaysChange.emit(this.numDays);
  }
  onWeek() {
    this.numDays = 7;
    this.numDaysChange.emit(this.numDays);
  }

  addDays(date: number, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getTime();
  }
}
