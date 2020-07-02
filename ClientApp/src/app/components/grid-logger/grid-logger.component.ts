import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserProviderService } from '../../services/api/user-provider.service';
import { Hours } from '../../models/hours.model';

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
  modalEdit: boolean;
  modal = false;
  editProject: object;

  constructor(
    private userService: UserService,
    private userProviderService: UserProviderService,
  ) {}

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

  getDateByDay(day): Date {
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
    }
    return this.mapHours(this.selectedDate);
  }

  mapHours(date: Date) {
    const result = [];
    Object.entries(this.user.Hours).map(([project, obj]) => {
      Object.entries(obj).map(([_date, hour]) => {
        if (this.dateToString(date) === _date) {
          result.push({
            Project: project,
            Date: _date,
            Hours: hour.Hours,
            Notes: hour.Notes,
          });
        }
      });
    });
    return result;
  }

  async onAdd(day) {
    this.modalDate = this.addDays(
      this.selectedDate,
      day + 1 - this.selectedDate.getDay(),
    );
    this.modalEdit = false;
    this.editProject = null;
    this.modal = true;
    this.user = await this.userService.getCurrentUser();
  }

  async onEdit(day, hours) {
    this.modalDate = this.addDays(
      this.selectedDate,
      day + 1 - this.selectedDate.getDay(),
    );
    this.modalEdit = true;
    this.editProject = hours;
    this.modal = true;
    this.user = await this.userService.getCurrentUser();
  }

  async onDelete(day, project) {
    const hours: Hours = {
      Date: this.getDateByDay(day).getTime(),
      Hours: 0,
      Project: project,
    };
    await this.userProviderService.deleteHours(this.user._id, hours);
    this.user = await this.userService.getCurrentUser();
    location.reload();
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
