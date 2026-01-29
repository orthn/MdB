import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {ToastService} from '../services/toast.service';
import {ICONS} from '../data/icons';


@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  loading = true;
  saving: boolean = false;
  user: User = new User();

  constructor(private api: ApiService, private userService: UserService, private router: Router, private toast: ToastService) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.user = this.userService.getUser();
    this.loadSettings()
  }

  loadSettings(): void {
    this.api.getUserById(this.user._id ?? '').subscribe({
      next: user => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.toast.show('Einstellungen konnten nicht geladen werden', 'error');
        this.loading = false;
      }
    });
  }

  save(): void {
    this.saving = true;
    this.api.updateUser(this.user).subscribe({
      next: () => {
        this.toast.show('Einstellungen gespeichert', 'success');
        this.saving = false;

        if (!this.user.settings.showAnimations) {
          document.body.classList.add('no-animations');
        } else {
          document.body.classList.remove('no-animations');
        }
      },
      error: () => {
        this.toast.show('Speichern fehlgeschlagen', 'error');
        this.saving = false;
      }
    });
  }

  protected readonly icons = ICONS;
}
