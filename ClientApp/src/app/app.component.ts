import { Component } from '@angular/core';
import { NavbarToggleService } from './services/navbar-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  loggedIn: boolean = false;

  constructor(public navbarService: NavbarToggleService) {}

  ngOnInit(): void {
    // TODO: Create loggin detection component
    //this.loggedIn = this.loggedInGuardComponent.isLoggedIn;
  }
}
