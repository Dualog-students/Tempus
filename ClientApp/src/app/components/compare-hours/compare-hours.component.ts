import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-compare-hours',
  templateUrl: './compare-hours.component.html',
  styleUrls: ['./compare-hours.component.scss'],
})
export class CompareHoursComponent implements OnInit {
  TimePeriod = TimePeriod;
  periodOptions = [
    { name: 'Month', value: TimePeriod.Month },
    { name: 'Week', value: TimePeriod.Week },
  ];
  user: User;
  allMonths = [];
  allWeeks = [];
  selectedPeriods = [];
  currentTab = this.periodOptions[0].value;
  totalHoursOff = 0;
  hoursLeftThisPeriod = 0;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    Object.values(this.user.Hours).forEach((hour: any) => {
      const month = hour.Date.slice(3);
      const week = hour.Date.slice(3);
      if (!this.allMonths.find(x => x.month === month)) {
        this.allMonths.push({ month: month });
      }
      if (!this.allWeeks.find(x => x.week === week)) {
        this.allWeeks.push({ week: week });
      }
    });
    this.allMonths.sort((a, b) => {
      return b.month.localeCompare(a.month);
    });
    this.allWeeks.sort((a, b) => {
      return b.week.localeCompare(a.week);
    });
    this.renderCurrentTab();
  }

  renderCurrentTab() {
    switch (this.currentTab) {
      case TimePeriod.Month:
        return this.renderMonth();

      case TimePeriod.Week:
        return this.renderWeek();
    }
  }

  onTabChange(event: any) {
    this.currentTab = event;
    this.selectedPeriods = [];
    this.renderCurrentTab();
  }

  onSelect(event: any) {
    this.selectedPeriods = event;
    this.renderCurrentTab();
  }

  renderMonth() {
    const userHoursPerMonth =
      (NumWorkHours.Month * this.user.PartTimePercentage) / 100;
    const currentMonth = new Date().toLocaleDateString().slice(3);
    let prevSum = 0;
    let currentSum = 0;
    Object.values(this.user.Hours).map((hour: any) => {
      const month = hour.Date.slice(3);
      if (this.selectedPeriods.find(x => x.month === month)) {
        prevSum += hour.Hours;
      } else if (month === currentMonth) {
        currentSum += hour.Hours;
      }
    });
    const prevAvgHours = prevSum / this.selectedPeriods.length;
    this.totalHoursOff = prevAvgHours - userHoursPerMonth;

    const hoursLeftThisMonth = userHoursPerMonth - currentSum;
    console.log(hoursLeftThisMonth);
    // TODO: fix this equation!!!
    this.hoursLeftThisPeriod =
      currentSum - this.totalHoursOff - userHoursPerMonth;
  }

  renderWeek() {}
}

enum TimePeriod {
  Year,
  Month,
  Week,
  Custom,
}

enum NumWorkHours {
  Day = 7.5,
  Week = 37.5,
  Month = 162.5,
}
