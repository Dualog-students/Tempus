import { Component } from '@angular/core';
import { NavbarToggleService } from './services/navbar-toggle.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    public navbarService: NavbarToggleService,
  ) {}

  ngOnInit(): void {}
}
