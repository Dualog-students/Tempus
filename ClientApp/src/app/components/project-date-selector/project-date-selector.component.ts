import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-project-date-selector',
  templateUrl: './project-date-selector.component.html',
  styleUrls: ['./project-date-selector.component.scss'],
})
export class ProjectDateSelectorComponent implements OnInit {
  @ViewChild('datePicker') datePicker: ElementRef;
  @Input() numDays: number;
  @Output() numDaysChange = new EventEmitter<number>();
  @Input() currentDate: Date;
  @Output() currentDateChange = new EventEmitter<Date>();
  @Input() selectedDate: Date;
  @Output() selectedDateChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {
    this.onWeek();
    this.setCurrentDate();
    this.setSelectedDate();
  }

  onBack() {
    if (this.numDays === 1) {
      this.addDate(-1);
    } else {
      const add = 1 - this.selectedDate.getDay() - 7;
      this.addDate(add);
    }
  }

  onPicked(event) {
    this.setSelectedDate(event);
  }

  onCurrent() {
    this.setCurrentDate(new Date());
  }

  onNext() {
    if (this.numDays === 1) {
      this.addDate(1);
    } else {
      const add = 8 - this.selectedDate.getDay();
      this.addDate(add);
    }
  }

  addDate(num: number) {
    this.setSelectedDate(this.addDays(this.selectedDate, num));
  }

  setSelectedDate(date = new Date()) {
    this.selectedDate = date;
    this.selectedDateChange.emit(this.selectedDate);
    this.datePicker?.writeValue(this.selectedDate);
  }

  setCurrentDate(date = new Date()) {
    this.currentDate = date;
    this.currentDateChange.emit(this.currentDate);
    this.setSelectedDate(this.currentDate);
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

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
