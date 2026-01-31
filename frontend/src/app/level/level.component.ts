import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../services/toast.service';
import {Level} from '../models/Level';
import {ICONS} from '../data/icons';
import confetti from 'canvas-confetti';
import {UserService} from '../services/user.service';
import {User} from '../models/User';
import {UserProgress} from '../models/UserProgress';

@Component({
  selector: 'app-level',
  standalone: false,
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  level!: Level;
  user!: User;
  userProgress!: UserProgress

  loading = true;
  httpError: any;

  // player state
  userCode = '';
  usedHints: number[] = [];
  feedback: string | null = null;
  submitting = false;
  animationDuration: number = 1500;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toast: ToastService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    const levelId = this.route.snapshot.params['id'];

    this.api.getLevelById(levelId).subscribe({
      next: level => {
        this.level = level;
        this.userCode = level.starterCode ?? '';

        this.userProgress = new UserProgress();
        this.userProgress.userId = this.user._id ?? ''
        this.userProgress.challengeId = this.level.challengeId
        this.userProgress.levelId = levelId
        this.loading = false;
      },
      error: err => {
        this.toast.show('Level konnte nicht geladen werden', 'error');
        this.httpError = err;
        this.loading = false;
      }
    });
  }

  protected readonly icons = ICONS;

  protected reset() {
    this.userCode = this.level.starterCode ?? '';
    this.feedback = null;
  }


  submit() {
    if (!this.level.solutions) return;

    this.submitting = true;
    this.feedback = null;

    // Normalize user input
    const normalizedCode: string = this.normalize(this.userCode.trim());

    // Find matching solution for the current mode
    const matchedSolution = this.level.solutions.find(s => {
      if (s.mode !== this.level.mode) return false;
      return this.normalize(s.code) === normalizedCode;
    });

    if (matchedSolution?.isCorrect) {
      this.api.updateUserProgress(this.userProgress).subscribe({
        next: progress => {
          this.celebrate()
          this.feedback = matchedSolution.feedback ?? 'Super! Level abgeschlossen 🎉';
          this.toast.show(this.feedback, 'success');

          setTimeout(() => {
            this.router.navigate(['/home']);
          }, this.animationDuration);
        },
        error: err => {
          this.toast.show('Fehler beim Speichern des Fortschritts', 'error');
        }
      });
    } else if (matchedSolution) {
      // Show its explanation/feedback
      this.feedback = matchedSolution.feedback ?? matchedSolution.explanation ?? 'Ohje, das war leider nicht richtig. Versuch es nochmal!';
      this.toast.show(this.feedback, 'error');
    } else {
      // If no match, display generic error
      this.feedback = this.level.mode === 'blocks'
        ? 'Achte auf die Reigenfolge!'
        :'Ohje, das war leider nicht richtig. Versuch es nochmal!'

      this.toast.show(this.feedback, 'error');
    }
    this.submitting = false;
  }

  private normalize(code?: string) {
    return code?.replace(/\s+/g, '') ?? '';
  }

  protected showHint() {
    if (!this.level.hints) return;

    const next = this.usedHints.length;
    if (next < this.level.hints.length) {
      this.usedHints.push(next);
    }
  }

  private celebrate(): void {
    const end = Date.now() + this.animationDuration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: {x: 0}
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: {x: 1}
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }

}
