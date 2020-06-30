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
  allMonths = [];
  selectedPeriods = [];
  totalHoursOff = 0;
  userHoursPerMonth = 0;
  hoursLeftThisPeriod = 0;

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
    const oldestMonth = Object.values(this.user.Hours).reduce<string>(
      (prev, hour: any) => {
        const month = hour.Date.slice(3);
        if (month.localeCompare(prev) < 0) return month;
        return prev;
      },
      currentMonth.getMonth() + '/' + currentMonth.getFullYear(),
    );

    const oldestMonthSplit = oldestMonth.split('/');
    const tempMonth = new Date(
      oldestMonthSplit[0] + '/01/' + oldestMonthSplit[1],
    );
    while (
      tempMonth.getMonth() < currentMonth.getMonth() ||
      tempMonth.getFullYear() < currentMonth.getFullYear()
    ) {
      this.allMonths.unshift({
        month: currentMonth.getMonth() + '/' + currentMonth.getFullYear(),
      });
      tempMonth.setMonth(tempMonth.getMonth() + 1);
    }
  }

  onSelect(event: any) {
    this.selectedPeriods = event;
    this.calculateHours();
  }

  calculateHours() {
    const currentDate = new Date();
    const currentMonth =
      currentDate.getMonth() + '/' + currentDate.getFullYear();
    let prevSum = 0;
    let currentSum = 0;
    Object.values(this.user.Hours).map((hour: any) => {
      const month = hour.Date.slice(3);
      if (this.selectedPeriods.find(x => x.month === month)) {
        prevSum += hour.Hours;
      }
      if (month === currentMonth) {
        currentSum += hour.Hours;
      }
    });

    this.totalHoursOff =
      prevSum - this.userHoursPerMonth * this.selectedPeriods.length;

    this.hoursLeftThisPeriod =
      this.userHoursPerMonth - currentSum - this.totalHoursOff;
  }
}

enum NumWorkHours {
  Day = 7.5,
  Week = 37.5,
  Month = 162.5,
}
