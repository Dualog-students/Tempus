import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  series = [46, 34, 20];
  labels = ['Project 1', 'Project 2', 'Project 3'];
  colors = ['#8caafd', '#d1ddfe', '#02405a'];

  series2 = [
    {
      name: 'Values',
      data: [55, 45, 5, 55, 25, 30, 25, 35, 60, 20],
    },
    {
      name: 'Values',
      data: [5, 5, 3, 4, 3, 2, 5, 7, 5, 4],
    },
  ];

  xaxis = {
    categories: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019],
  };
}
