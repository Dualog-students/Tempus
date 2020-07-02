import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserProviderService } from '../../services/api/user-provider.service';
import { Hours } from '../../models/hours.model';
import { Day, WeekDay } from '../../models/day.model';
import {
  Date2WeekDayEU,
  Date2WeekDayUS,
  Date2String,
} from '../../utils/pipes/date.pipe';

@Component({
  selector: 'app-grid-logger',
  templateUrl: './grid-logger.component.html',
  styleUrls: ['./grid-logger.component.scss'],
})
export class GridLoggerComponent implements OnInit {
  user: User;
  dayList: Day[];

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
    private date2WeekDayEU: Date2WeekDayEU,
    private date2WeekDayUS: Date2WeekDayUS,
    private date2String: Date2String,
  ) {}

  ngOnInit() {
    this.refreshUser();
  }

  get numDaysList() {
    return [...Array(this.numDays).keys()];
  }

  async refreshUser() {
    this.user = await this.userService.getCurrentUser();
    const dateList = this.numDaysList.map((day) => this.day2Date(day));
    const hoursList = dateList.map((date) => {
      return {
        date,
        hours: this.getHours(date),
      };
    });

    this.dayList = hoursList.map((hours) => {
      return {
        date: hours.date,
        weekDayEU: this.date2WeekDayEU.transform(hours.date),
        weekDayUS: this.date2WeekDayUS.transform(hours.date),
        hoursList: hours.hours,
      };
    });
    console.log(this.dayList);
  }

  day2Date(day: number): Date {
    if (this.numDays !== 1) {
      return this.addDays(
        this.selectedDate,
        day + 1 - this.selectedDate.getDay(),
      );
    }
    return this.selectedDate;
  }

  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  getHours(date: Date) {
    const result = [];
    Object.entries(this.user.Hours).map(([project, obj]) => {
      Object.entries(obj).map(([_date, hour]) => {
        if (this.date2String.transform(date) === _date) {
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

  onAdd(day: Day) {
    this.modalEdit = false;
    this.editProject = null;
    this.onModal(day);
  }

  onEdit(day: Day, hours: Hours) {
    this.modalEdit = true;
    this.editProject = hours;
    this.onModal(day);
  }

  async onModal(day: Day) {
    this.modalDate = day.date;
    this.modal = true;
    this.refreshUser();
  }

  async onDelete(day: Day, hours: Hours) {
    // Delete user from database
    await this.userProviderService.deleteHours(this.user._id, hours);
    // Ges user from database
    this.user = await this.userService.getCurrentUser();
    this.refreshUser();
  }
}
