import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: User;
  @Input() numDays: number;
  @Input() date: Date;

  modal = false;

  async ngOnInit() {
    this.numDays = 7;
    this.date = new Date();
    this.user = await this.userService.getCurrentUser();
  }
}
