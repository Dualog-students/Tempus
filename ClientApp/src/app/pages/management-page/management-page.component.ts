import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserProviderService } from '../../services/api/user-provider.service';

@Component({
  selector: 'app-management-page',
  templateUrl: './management-page.component.html',
  styleUrls: ['./management-page.component.scss'],
})
export class ManagementPageComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UserService,
    private userProvider: UserProviderService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userProvider.getAllUsers().then(users => (this.users = users));
  }

  onRowClick(user: User) {
    this.router.navigate(['manage-user/' + user._id]);
  }
}
