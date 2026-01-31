import {Component, OnInit} from '@angular/core';
import {LeaderboardEntry} from '../models/LeaderboardEntry';
import {ApiService} from '../services/api.service';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-leaderboard',
  standalone: false,
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss'
})
export class LeaderboardComponent implements OnInit {
  protected leaderboard: LeaderboardEntry[] = [];

  // loading indicator
  protected loading: boolean = true

  constructor(
    private api: ApiService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.api.getLeaderboard().subscribe({
      next: (leaderboard) => {
        this.leaderboard = leaderboard;
        this.loading = false;
      },
      error: err => {
        this.toast.show('Bestenliste konnte nicht geladen werden', 'error')
        this.loading = false
      }
    })
  }

}
