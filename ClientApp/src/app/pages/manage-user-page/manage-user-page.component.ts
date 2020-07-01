import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user.model';
import { UserProviderService } from '../../services/api/user-provider.service';

@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrls: ['./manage-user-page.component.scss'],
})
export class ManageUserPageComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private userProvider: UserProviderService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userProvider.getUser(id).then(user => (this.user = user));
  }
}
