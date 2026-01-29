import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ICONS} from '../data/icons';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router, public userService: UserService) {
  }

  icons = ICONS;

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
