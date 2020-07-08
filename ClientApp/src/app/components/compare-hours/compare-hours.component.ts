import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-compare-hours',
  templateUrl: './compare-hours.component.html',
  styleUrls: ['./compare-hours.component.scss'],
})
export class CompareHoursComponent implements OnInit {
  user: User;
  allMonths = [{ month: this.dateToMMYYY(new Date()) }];
  selectedPeriods = [];
  totalHours = 0;
  totalWorkedHours = 0;
  userHoursPerMonth = 0;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    this.userHoursPerMonth =
      (NumWorkHours.Month * this.user.PartTimePercentage) / 100;

    this.getAllMonths();
    this.calculateHours();
  }

  getAllMonths() {
    const currentMonth = new Date();
    let oldestMonth = this.dateToMMYYY(currentMonth);
    Object.values(this.user.Hours).map((project: any) => {
      Object.keys(project).map((date: string) => {
        const month = date.slice(3);
        if (oldestMonth.localeCompare(month) > 0) {
          oldestMonth = month;
        }
      });
    });

    const oldestMonthSplit = oldestMonth.split('/');
    const oldestDate = new Date(
      oldestMonthSplit[0] + '/01/' + oldestMonthSplit[1],
    );
    const tempMonth = currentMonth;
    tempMonth.setMonth(tempMonth.getMonth() - 1);
    tempMonth.setDate(1);
    while (
      tempMonth.getMonth() >= oldestDate.getMonth() &&
      tempMonth.getFullYear() >= oldestDate.getFullYear()
    ) {
      this.allMonths.push({
        month: this.dateToMMYYY(tempMonth),
      });
      tempMonth.setMonth(tempMonth.getMonth() - 1);
    }

    this.selectedPeriods = [this.allMonths[0]];
  }

  onSelect(event: any) {
    this.selectedPeriods = event;
    this.calculateHours();
  }

  calculateHours() {
    const currentDate = new Date();
    this.totalHours = this.selectedPeriods.length * this.userHoursPerMonth;
    this.totalWorkedHours = 0;
    Object.values(this.user.Hours).map((project: any) => {
      Object.entries(project).map(([date, hour]: any) => {
        const month = date.slice(3);
        if (this.selectedPeriods.find((x) => x.month === month)) {
          this.totalWorkedHours += hour.Hours / 100;
        }
      });
    });
  }

  dateToMMYYY(date: Date) {
    return `0${date.getMonth() + 1}`.slice(-2) + '/' + date.getFullYear();
  }
}

enum NumWorkHours {
  Day = 7.5,
  Week = 37.5,
  Month = 162.5,
}
