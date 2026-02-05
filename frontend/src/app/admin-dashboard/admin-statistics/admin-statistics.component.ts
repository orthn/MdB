import {Component, OnInit} from '@angular/core';
import {ICONS} from '../../data/icons';
import {ApiService} from '../../services/api.service';
import {ToastService} from '../../services/toast.service';
import {ActivatedRoute} from '@angular/router';
import {Statistics} from '../../models/Statistics';

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

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('studentId')) {
      const userId: string = String(this.route.snapshot.paramMap.get('studentId'));
      this.loadStatistics(userId);
    }
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
}
