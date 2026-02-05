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
  protected readonly icons = ICONS;
  protected user: User = new User();

  // loading indicator
  protected loading: boolean = true;

  // saving indicator
  protected saving: boolean = false;

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private toast: ToastService) {
  }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    this.user = this.userService.getUser();
    this.loadSettings()
  }

  private loadSettings(): void {
    this.api.getUserById(this.userService.getUser().id).subscribe({
      next: (user: User) => {
        this.user = user;
        this.loading = false;
      },
      error: () => {
        this.toast.show('Einstellungen konnten nicht geladen werden', 'error');
        this.loading = false;
      }
    });
  }

  protected save(): void {
    this.saving = true;
    this.api.updateUser(this.user).subscribe({
      next: () => {
        this.userService.applySettings(this.user.settings)
        this.toast.show('Einstellungen gespeichert', 'success');
        this.saving = false;
      },
      error: () => {
        this.toast.show('Speichern fehlgeschlagen', 'error');
        this.saving = false;
      }
    });
  }
}
