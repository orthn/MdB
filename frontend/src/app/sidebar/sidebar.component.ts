import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ICONS} from '../data/icons';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router) {
  }

  icons = ICONS;

  logout(): void {

  }
}
