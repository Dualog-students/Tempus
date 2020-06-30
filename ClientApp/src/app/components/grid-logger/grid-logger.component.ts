import { Component, OnInit, Input } from '@angular/core';

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
  @Input() numDays: number;
  date: number;

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

  ngOnInit(): void {}

  onAdd(day) {
    this.projects.push({
      name: 'project1',
      hours: 53,
    });
  }
}
