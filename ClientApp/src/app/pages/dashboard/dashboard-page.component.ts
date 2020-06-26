import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private userService: UserService) {}
  user: User;

  ngOnInit(): void {
    console.log(this.userService.isLoggedIn);

    // Set the user to be current user
    this.userService.getCurrentUser().then((resp) => {
      this.user = resp;
    });
  }
}
