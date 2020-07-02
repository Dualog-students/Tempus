import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationStrategy } from '@angular/common';

import { User } from '../../models/user.model';
import { UserProviderService } from '../../services/api/user-provider.service';

@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.scss'],
})
export class ManageUserPageComponent implements OnInit {
  page = 1;
  user: User;
  report = [];
  selectedDate: { from: Date; to: Date };
  currentProject: any = {};

  constructor(
    private route: ActivatedRoute,
    private userProvider: UserProviderService,
    private locationStrategy: LocationStrategy,
  ) {
    this.locationStrategy.onPopState(() => {
      if (this.page > 1) this.page--;
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userProvider.getUser(id).then(user => {
      this.user = user;
      this.refreshReport();
    });
  }

  refreshReport() {
    this.report = [];
    let sum = 0;
    Object.entries(this.user.Hours).map(([project, obj]: any) => {
      let temp = { project: project, hours: 0 };
      Object.entries(obj).map(([_date, hours]: any) => {
        const date = this.parseDDMMYYYToDate(_date);
        date.setHours(3);
        if (date >= this.selectedDate.from && date <= this.selectedDate.to) {
          temp.hours += hours.Hours;
        }
      });
      if (temp.hours > 0) {
        this.report.push(temp);
        sum += temp.hours;
      }
    });
    this.report.push({ project: 'Total', hours: sum });
  }

  onDateSelect(event: any) {
    this.selectedDate = event;
    if (this.user) this.refreshReport();
  }

  onRowClick(event: any) {
    if (event.project === 'Total') return;
    this.changePage(2);
    this.currentProject.name = event.project;
    this.currentProject.hours = Object.entries(
      this.user.Hours[event.project],
    ).filter(([_date, obj]) => {
      const date = this.parseDDMMYYYToDate(_date);
      date.setHours(3);
      return date >= this.selectedDate.from && date <= this.selectedDate.to;
    });
  }

  changePage(page: number) {
    if (page > this.page) history.pushState(null, null, window.location.href);
    else history.back();
    this.page = page;
  }

  parseDDMMYYYToDate(date: string) {
    const _date = date.split('/');
    return new Date(`${_date[1]}/${_date[0]}/${_date[2]}`);
  }
}
