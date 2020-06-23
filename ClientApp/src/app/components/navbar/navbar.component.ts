import { Component, OnInit, ElementRef } from '@angular/core';
import { NavbarToggleService } from '../../services/navbar-toggle.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public navbarService: NavbarToggleService, private el: ElementRef) {}

  ngOnInit(): void {}
}
