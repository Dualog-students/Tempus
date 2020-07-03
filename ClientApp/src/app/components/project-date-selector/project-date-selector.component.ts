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

  @Output() refreshUserSelector = new EventEmitter();

  defaultCurrentDate = new Date();

  constructor() {}

  ngOnInit(): void {
    this.onNumDays(7, false);
    this.setCurrentDate(new Date().getTime(), false);
    this.setSelectedDate(this.currentDate, false);
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

  setSelectedDate(date = new Date().getTime(), refresh = true) {
    this.selectedDate = date;
    this.selectedDateChange.emit(this.selectedDate);
    this.datePicker?.writeValue(new Date(this.selectedDate));
    if (refresh) {
      this.refreshUserSelector.emit();
    }
  }

  setCurrentDate(date = new Date().getTime(), selected = true) {
    this.currentDate = date;
    this.currentDateChange.emit(this.currentDate);
    if (selected) {
      this.setSelectedDate(this.currentDate);
    }
  }

  onNumDays(numDays: number, refresh = true) {
    this.numDays = numDays;
    this.numDaysChange.emit(this.numDays);
    if (refresh) {
      this.refreshUserSelector.emit();
    }
  }

  addDays(date: number, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getTime();
  }
}
