import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  user: User;
  constructor(private userService: UserService) {}
  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    console.log(this.user);
    console.log(this.test.getDay());
  }

  dateString = '30/06/2020'.split('/');
  test = new Date(
    +this.dateString[2],
    +this.dateString[1] - 1,
    +this.dateString[0],
  );

  series = [
    {
      name: 'Hours',
      data: [55, 45, 5, 55, 25, 30, 25, 35, 60, 20, 55, 45, 5, 55, 25, 30, 25],
    },
    {
      name: 'Values',
      data: [58, 120, 5, 45, 25, 30, 25, 35, 60, 20],
    },
  ];

  xaxis = {
    categories: this.day,
  };
}
