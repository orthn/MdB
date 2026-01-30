import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Statistics} from '../models/Statistics';
import {ICONS} from '../data/icons';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  httpError: any;
  loading = true;
  icons = ICONS;
  stats!: Statistics;

  constructor(private api: ApiService, private userService: UserService, private router: Router ) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {this.router.navigate(['/login']);}
    if (this.userService.isTeacher()) {this.router.navigate(['/dashboard']);}
    this.loadStatistics()
  }

  private loadStatistics() {
    const userId: string = this.userService.getUser()._id
    this.api.getUserStats(userId).subscribe({
      next: data => {
        this.stats = data;
        this.loading = false;
      },
      error: (error) => {
        this.httpError = error;
        this.loading = false;
      }
    })
  }
}
