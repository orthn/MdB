import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {Statistics} from '../models/Statistics';
import {ICONS} from '../data/icons';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-statistics',
  standalone: false,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent implements OnInit {
  protected stats: Statistics = {
    totalCompletedLevels: 0,
    totalAttempts: 0,
    levelsPerChallenge: []
  };

  // loading indicator
  protected loading: boolean = true;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    //this.userService.checkIfUserIsAllowedAndReroute()
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
        this.toast.show('Statistiken konnten nicht geladen werden', 'error')
        this.loading = false;
      }
    })
  }
}
