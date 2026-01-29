import { Component } from '@angular/core';
import {ICONS} from '../data/icons';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router, private userService: UserService) {
  }
  icons = ICONS;

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  protected navigateToSettings() {
    this.router.navigate(['/settings/']);
  }
}
