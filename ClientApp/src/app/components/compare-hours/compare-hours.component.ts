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
    let oldestMonth = Object.values(this.user.Hours).reduce(
      (prev, hour: any) => {
        const month = hour.Date.slice(3);
        if (month.localeCompare(prev) < 0) return month;
        return prev;
      },
      currentMonth.toLocaleDateString().slice(3),
    );

    oldestMonth = oldestMonth.split('/');
    const tempMonth = new Date(oldestMonth[0] + '/01/' + oldestMonth[1]);
    while (
      tempMonth.getMonth() < currentMonth.getMonth() ||
      tempMonth.getYear() < currentMonth.getYear()
    ) {
      this.allMonths.unshift({
        month: tempMonth.toLocaleDateString().slice(3),
      });
      tempMonth.setMonth(tempMonth.getMonth() + 1);
    }
  }

  onSelect(event: any) {
    this.selectedPeriods = event;
    this.calculateHours();
  }

  calculateHours() {
    const currentMonth = new Date().toLocaleDateString().slice(3);
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
