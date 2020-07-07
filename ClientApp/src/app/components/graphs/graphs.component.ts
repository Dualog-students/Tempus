import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Hours } from 'src/app/models/hours.model';
import { TestBed } from '@angular/core/testing';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss'],
})
export class GraphsComponent implements OnInit {
  user: User;
  hours: Hours;
  test = [];
  constructor(private userService: UserService) {}
  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    Object.values(this.user.Hours).map((hours: any) => {
      Object.entries(hours).map(([hours2]: any) => {
        this.test.push(hours2);
        console.log(this.test);
      });
    });
  }

  series = [
    {
      name: 'Hours',
      data: this.test,
    },
  ];

  xaxis = {
    categories: [1, 2, 3, 4, 5, 6, 7],
  };
}
