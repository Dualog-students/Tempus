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
  @Input() date: Date;
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

  updateHoursKey(date): string {
    const day = this.zeroPad(date.getDate());
    const month = this.zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getWeekDay(day) {
    if (this.numDays === 1) {
      return this.weekDays[this.date.getDay()];
    }
    return this.weekDays[(day + 1) % 7];
  }

  getHours(day: number) {
    const date = new Date();
    if (this.numDays !== 1) {
      date.setDate(this.date.getDate() + day + 1 - this.date.getDay());
      return this.mapHours(date);
    } else {
      return this.mapHours(this.date);
    }
  }

  mapHours(date: Date) {
    let hour: any;
    const hours = [];
    Object.values(this.user.Hours).map((hour) => {
      if (this.updateHoursKey(date) === hour.Date) {
        hours.push(hour);
      }
    });
    return hours.length ? hours : null;
  }

  async onAdd(day) {
    this.modalDate = new Date();
    this.modalDate.setDate(this.date.getDate() + day + 1 - this.date.getDay());
    this.modal = true;
    this.user = await this.userService.getCurrentUser();
  }

  onEdit(day, i) {}
}
