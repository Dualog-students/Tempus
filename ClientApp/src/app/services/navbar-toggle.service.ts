import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarToggleService {
  hideNav = false;

  constructor() {}

  toggleNav(): void {
    this.hideNav = !this.hideNav;
  }
}
