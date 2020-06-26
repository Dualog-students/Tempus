import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { UserProviderService } from '../../services/api/user-provider.service';

@Component({
  selector: 'app-manage-admin-page',
  templateUrl: './manage-admin-page.component.html',
  styleUrls: ['./manage-admin-page.component.scss'],
})
export class ManageAdminPageComponent implements OnInit {
  user: User;
  otherUsers: User[] = [];

  constructor(
    private userService: UserService,
    private userProvider: UserProviderService,
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    const users = await this.userProvider.getAllUsers();
    if (users) {
      this.otherUsers = users.filter(u => u._id !== this.user._id);
    }
  }

  async toggleAdmin(user: User, status: boolean) {
    await this.userProvider.updateUserField(
      user._id,
      'IsAdmin',
      status.toString(),
    );
  }
}
