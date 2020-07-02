import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Hours } from 'src/app/models/hours.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  user: User;
  hours: Hours;
  constructor(private userService: UserService) {}
  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    console.log(this.user.Hours);
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
      data: this.hours,
    },
  ];

  xaxis = {
    categories: [1, 2, 3, 4, 5, 6, 7],
  };
}
