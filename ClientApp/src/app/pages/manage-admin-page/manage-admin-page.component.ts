import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-admin-page',
  templateUrl: './manage-admin-page.component.html',
  styleUrls: ['./manage-admin-page.component.scss'],
})
export class ManageAdminPageComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }
}
