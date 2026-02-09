import {Component, OnInit} from '@angular/core';
import {ICONS} from '../../data/icons';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
import {ActivatedRoute} from '@angular/router';
import {Statistics} from '../../models/Statistics';
import {User} from '../../models/User';

@Component({
  selector: 'app-admin-statistics',
  standalone: false,
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.scss'
})
export class AdminStatisticsComponent implements OnInit {
  protected readonly icons = ICONS;
  protected statistics: Statistics = {
    totalCompletedLevels: 0,
    totalAttempts: 0,
    levelsPerChallenge: []
  };

  // loading indicator
  protected loading: boolean = true;

  protected user?: User;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('studentId');
    if (!userId) return;

    this.loadUser(userId)
    this.loadStatistics(userId)
  }

  private loadUser(userId: string): void {
    this.api.getUserById(userId).subscribe({
      next: user => this.user = user,
      error: () =>
        this.toast.show('Benutzer konnte nicht geladen werden', 'error')
    });
  }

  private loadStatistics(userId: string): void {
    this.api.getStatisticsOfUserById(userId).subscribe({
      next: data => {
        this.statistics = data;
        this.loading = false;
      },
      error: (error) => {
        this.toast.show('Statistiken konnten nicht geladen werden', 'error')
        this.loading = false;
      }
    })
  }

  get performance(): string {
    if (!this.statistics.totalAttempts || !this.statistics.totalCompletedLevels ) return 'Keine Daten';
    const avg =
      this.statistics.totalAttempts /
      this.statistics.totalCompletedLevels;

    if (avg <= 1.5) return 'Exzellent';
    if (avg <= 3) return 'Gut';
    if (avg <= 5) return 'Durchschnittlich';

    return 'Auffällig';
  }
}
