import {Component, OnInit} from '@angular/core'
import {ApiService} from '../services/api.service'
import {ActivatedRoute, Router} from '@angular/router'
import {ToastService} from '../services/toast.service'
import {Level} from '../models/Level'
import {ICONS} from '../data/icons'
import confetti from 'canvas-confetti'
import {UserService} from '../services/user.service'
import {User} from '../models/User'
import {UserProgress} from '../models/UserProgress'

@Component({
  selector: 'app-level',
  standalone: false,
  templateUrl: './level.component.html',
  styleUrl: './level.component.scss'
})
export class LevelComponent implements OnInit {
  protected readonly icons = ICONS
  protected level!: Level
  protected user!: User
  protected userProgress!: UserProgress

  // loading indicator
  protected loading = true

  // player state
  protected userCode = ''
  protected usedHints: number[] = []
  protected feedback: string | null = null
  protected submitting = false
  protected animationDuration: number = 1500

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toast: ToastService,
  ) {
  }

  public ngOnInit(): void {
    this.user = this.userService.getUser()
    const levelId = this.route.snapshot.params['id']

    this.api.getLevelById(levelId).subscribe({
      next: level => {
        this.level = level

        // Set starter code on code based levels
        if (this.level.mode === 'code') {
          this.userCode = this.level.starterCode ?? ''
        }

        // Shuffle array if level is block based
        if (this.level.mode === 'blocks' && this.level.starterBlocks && this.level.starterBlocks?.length > 0) {
          this.level.starterBlocks = this.shuffleArray(this.level.starterBlocks)
        }

        this.userProgress = new UserProgress()
        this.userProgress.userId = this.user._id ?? ''
        this.userProgress.challengeId = this.level.challengeId
        this.userProgress.levelId = levelId

        this.loading = false
      },
      error: err => {
        this.toast.show('Level konnte nicht geladen werden', 'error')
        this.loading = false
      }
    })
  }

  protected submit() {
    if (!this.level.solutions) return

    this.submitting = true
    this.feedback = null

    // Normalize user input
    const normalizedCode: string = this.normalizeCode(this.userCode.trim())

    // Find matching solution for the current mode
    const matchedSolution = this.level.solutions.find(s => {
      if (s.mode !== this.level.mode) return false
      return this.normalizeCode(s.code) === normalizedCode
    })

    if (matchedSolution?.isCorrect) {
      this.api.updateUserProgress(this.userProgress).subscribe({
        next: progress => {
          this.showCelebration()
          this.feedback = matchedSolution.feedback ?? 'Super! Level abgeschlossen 🎉'
          this.toast.show(this.feedback, 'success')

          setTimeout(() => {
            this.router.navigate(['/home'])
          }, this.animationDuration)
        },
        error: err => {
          this.toast.show('Fehler beim Speichern des Fortschritts', 'error')
        }
      })
    } else if (matchedSolution) {
      // Show its explanation/feedback
      this.feedback = matchedSolution.feedback ?? matchedSolution.explanation ?? 'Ohje, das war leider nicht richtig. Versuch es nochmal!'
      this.toast.show(this.feedback, 'error')
    } else {
      // If no match, display generic error
      this.feedback = this.level.mode === 'blocks'
        ? 'Achte auf die Reigenfolge!'
        : 'Ohje, das war leider nicht richtig. Versuch es nochmal!'

      this.toast.show(this.feedback, 'error')
    }
    this.submitting = false
  }

  protected reset() {
    this.userCode = this.level.starterCode ?? ''
    this.feedback = null
  }

  protected showHint() {
    if (!this.level.hints) return

    const next = this.usedHints.length
    if (next < this.level.hints.length) {
      this.usedHints.push(next)
    }
  }

  private showCelebration(): void {
    const end = Date.now() + this.animationDuration

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: {x: 0}
      })

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: {x: 1}
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  private normalizeCode(code?: string) {
    return code?.replace(/\s+/g, '') ?? ''
  }

  private shuffleArray(array: string[]) {
    let i = array.length, j, temp
    while (--i > 0) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[j]
      array[j] = array[i]
      array[i] = temp
    }
    return array
  }
}
