import { Component, OnInit, ElementRef } from '@angular/core';
import { NavbarToggleService } from '../../services/navbar-toggle.service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public navbarService: NavbarToggleService,
    private loginService: LoginService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
