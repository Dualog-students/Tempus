import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-logger',
  templateUrl: './grid-logger.component.html',
  styleUrls: ['./grid-logger.component.scss'],
})
export class GridLoggerComponent implements OnInit {
  weekDays = [
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
    { name: 'Sunday' },
  ];
  numDays = 7;
  date: number;
  days: any[];

  projects = [
    {
      name: 'project1',
      hours: 53,
    },
    {
      name: 'project2',
      hours: 65,
    },
    {
      name: 'project3',
      hours: 15,
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.setDays(this.numDays);
  }

  setDays(num: number) {
    this.days = this.weekDays.splice(0, num);
  }

  onAdd(day) {
    this.projects.push({
      name: 'project1',
      hours: 53,
    });
  }
}
