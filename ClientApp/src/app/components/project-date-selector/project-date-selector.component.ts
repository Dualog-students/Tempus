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
  @Input() date: Date;
  @Output() dateChange = new EventEmitter<Date>();

  constructor() {}

  ngOnInit(): void {
    this.setDate();
    this.onWeek();
  }

  onBack() {
    if (this.numDays === 1) {
      this.addDate(-1);
    } else {
      const add = 1 - this.date.getDay() - 7;
      this.addDate(add);
    }
  }

  onPicked(event) {
    this.setDate(event);
  }

  onCurrent() {
    this.setDate(new Date());
  }

  onNext() {
    if (this.numDays === 1) {
      this.addDate(1);
    } else {
      const add = 8 - this.date.getDay();
      this.addDate(add);
    }
  }

  addDate(num: number) {
    const date = this.date;
    date.setDate(date.getDate() + num);
    console.log(date);
    this.setDate(date);
  }

  setDate(date = new Date()) {
    this.date = date;
    this.dateChange.emit(this.date);
    this.datePicker?.writeValue(this.date);
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
}
