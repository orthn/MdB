import { Component, Input, OnInit } from '@angular/core';
import { Challenge } from '../models/Challenge';
import { ApiService } from '../services/api.service';
import { forkJoin } from 'rxjs';
import { Level } from '../models/Level';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { UserProgress } from '../models/UserProgress';
import {ICONS} from '../data/icons';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  @Input() breadcrumbs: { label: string; url?: string }[] = [];
  icons = ICONS;

  challenges: Challenge[] = [];
  progress: UserProgress[] = [];
  loading = true;

  constructor(
    private api: ApiService,
    private toast: ToastService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.userService.isTeacher()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadLearningPath();
    this.loadProgress();
  }

  loadProgress(): void {
    this.api.getCompletedLevels(this.userService.getUser()._id).subscribe({
      next: progress => {
        this.progress = progress;
        this.applyProgressToLevels();
      }
    });
  }

  loadLearningPath(): void {
    this.api.getAllChallenges().subscribe({
      next: challenges => {
        this.challenges = challenges.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

        forkJoin(
          challenges.map(c => this.api.getLevelsOfChallenge(c._id!))
        ).subscribe(allLevels => {
          allLevels.forEach((levels, i) => {
            this.challenges[i].levels = levels.sort((a, b) => a.order - b.order);
          });

          this.applyProgressToLevels();
          this.loading = false;
        });
      }
    });
  }

  private applyProgressToLevels(): void {
    if (!this.challenges.length) return;

    const completedIds = new Set(this.progress.map(p => p.levelId.toString()));

    this.challenges.forEach(challenge => {
      let nextAssigned = false;

      challenge.levels.forEach((level, index) => {
        const isCompleted = completedIds.has(level._id!.toString());
        const prevCompleted =
          index > 0 &&
          completedIds.has(challenge.levels[index - 1]._id!.toString());

        level.isCompleted = isCompleted;
        level.isActive = index === 0 || isCompleted || prevCompleted;
      });
    });
  }

  startLevel(level: Level): void {
    if (!level.isActive) {
      this.toast.show('Dieses Level ist noch nicht verfügbar', 'info');
      return;
    }

    this.router.navigate(['/level', level._id]);
  }

  getGlobalIndex(challengeIndex: number, levelIndex?: number): number {
    let offset = 0;
    for (let i = 0; i < challengeIndex; i++) {
      offset += 2 + this.challenges[i].levels.length;
    }
    return levelIndex === undefined ? offset : offset + 1 + levelIndex;
  }
}
