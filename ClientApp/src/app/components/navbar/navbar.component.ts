import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { NavbarToggleService } from '../../services/navbar-toggle.service';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    public navbarService: NavbarToggleService,
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
