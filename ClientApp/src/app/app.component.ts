import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items = [
    {
      id: 1,
      name: 'Apple',
      price: 12,
      discounted: false,
    },
    {
      id: 2,
      name: 'Orange',
      price: 20,
      discounted: false,
    },
    {
      id: 3,
      name: 'Banana',
      price: 17,
      discounted: false,
    },
    {
      id: 4,
      name: 'Grapes',
      price: 35,
      discounted: true,
    },
    {
      id: 5,
      name: 'Pear',
      price: 10,
      discounted: false,
    },
    {
      id: 6,
      name: 'Kiwi',
      price: 6,
      discounted: true,
    }
  ];



  title = 'tempus';
}
