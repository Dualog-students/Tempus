import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

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
      data: [6.5, 8, 2, 8, 7.5],
    },
  ];

  xaxis = {
    categories: this.test,
  };
}
