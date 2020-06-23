import { Component, OnInit } from '@angular/core';
import { NavbarToggleService } from '../../services/navbar-toggle.service';

@Component({
  selector: 'app-nav-toggler',
  templateUrl: './nav-toggler.component.html',
  styleUrls: ['./nav-toggler.component.scss'],
})
export class NavTogglerComponent implements OnInit {
  constructor(public navbarService: NavbarToggleService) {}

  ngOnInit(): void {}
}
