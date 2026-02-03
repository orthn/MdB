import {Injectable} from '@angular/core';
import {UserSettings} from '../models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'currentUser';
  private jwtToken = 'jwtToken';

  constructor(private router: Router) {}

  setUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any | null {
    const user = localStorage.getItem(this.userKey);

    if (!user || user === 'undefined') {
      return null;
    }

    return JSON.parse(user);
  }

  isTeacher(): boolean {
    if (!this.getUser()) {
      return false;
    }

    return this.getUser().isTeacher;
  }

  clearUser(): void {
    localStorage.removeItem(this.userKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.jwtToken, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.jwtToken);
  }

  removeToken(): void {
    localStorage.removeItem(this.jwtToken);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearUser();
    this.removeToken();
  }

  applySettings(settings: UserSettings): void {
    const user = this.getUser()
    user.settings.showAnimations = settings?.showAnimations ?? true;
    user.settings.showHints = settings?.showHints ?? true;

    if (user.settings.showAnimations) {
      document.body.classList.remove('no-animations');
    } else {
      document.body.classList.add('no-animations');
    }
    this.setUser(user);
  }

  public checkIfUserIsAllowedAndReroute() {
    if (!this.getUser().isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    if (this.getUser().isTeacher()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
