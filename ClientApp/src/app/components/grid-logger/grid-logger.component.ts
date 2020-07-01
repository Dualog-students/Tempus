import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-grid-logger',
  templateUrl: './grid-logger.component.html',
  styleUrls: ['./grid-logger.component.scss'],
})
export class GridLoggerComponent implements OnInit {
  user: User;
  weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  @Input() numDays: number;
  @Input() currentDate: Date;
  @Input() selectedDate: Date;
  modalDate = new Date();
  modal = false;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }

  get numDaysList() {
    return [...Array(this.numDays).keys()];
  }

  zeroPad(n: number): string {
    return (n < 10 ? '0' + n : n).toString();
  }

  dateToString(date): string {
    const day = this.zeroPad(date.getDate());
    const month = this.zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getWeekDay(day) {
    if (this.numDays === 1) {
      return this.weekDays[this.selectedDate.getDay()];
    }
    return this.weekDays[(day + 1) % 7];
  }

  getDateByDay(day) {
    if (this.numDays !== 1) {
      return this.addDays(
        this.selectedDate,
        day + 1 - this.selectedDate.getDay(),
      );
    }
    return this.selectedDate;
  }

  getHours(day: number) {
    if (this.numDays !== 1) {
      return this.mapHours(
        this.addDays(this.selectedDate, day + 1 - this.selectedDate.getDay()),
      );
    } else {
      return this.mapHours(this.selectedDate);
    }
  }

  mapHours(date: Date) {
    return Object.values(this.user.Hours).filter(
      (hour: any) => this.dateToString(date) === hour.Date,
    );
  }

  async onAdd(day) {
    this.modalDate = this.addDays(
      this.selectedDate,
      day + 1 - this.selectedDate.getDay(),
    );
    this.modal = true;
    this.user = await this.userService.getCurrentUser();
  }

  onEdit(day, i) {}

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
