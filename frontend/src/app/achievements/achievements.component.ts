import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ApiService} from '../services/api.service';
import {Router} from '@angular/router';
import {ToastService} from '../services/toast.service';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss'
})
export class AchievementsComponent implements OnInit {

  // loading indicator
  protected loading: boolean = true;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    this.loadAchievements()
  }

  private loadAchievements(): void {
    this.loading = false;
    this.toast.show('Belohnungen konnten nicht geladen werden', 'error');
  }
}
