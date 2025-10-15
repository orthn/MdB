import { Component } from '@angular/core';
import {ICONS} from '../data/icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router) {
  }
  icons = ICONS;

  logout(): void {

  }
}
