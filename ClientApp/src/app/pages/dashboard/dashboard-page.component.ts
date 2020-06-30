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

  modal = true;

  ngOnInit(): void {
    console.log(this.userService.isLoggedIn);

    // Set the user to be current user
    this.userService.getCurrentUser().then((resp) => {
      this.user = resp;
    });
    this.numDays = 7;
  }

  onRegister() {
    this.modal = true;
  }
}
