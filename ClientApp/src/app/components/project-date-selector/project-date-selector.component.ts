import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-date-selector',
  templateUrl: './project-date-selector.component.html',
  styleUrls: ['./project-date-selector.component.scss'],
})
export class ProjectDateSelectorComponent implements OnInit {
  options = [
    { name: 'Item 1', value: 'Item 1' },
    { name: 'Item 2', value: 'Item 2' },
    { name: 'Item 3', value: 'Item 3' },
    { name: 'Item 4', value: 'Item 4' },
  ];

  constructor() {}

  ngOnInit(): void {}

  onChange(event) {
    console.log(event);
  }
}
