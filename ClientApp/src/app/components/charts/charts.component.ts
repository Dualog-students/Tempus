import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  series = [46, 34, 20];
  labels = ['Label 1', 'Label 2', 'Label 3'];
  colors = ['#ebf0f2', '#d1ddfe', '#02405a'];
}
