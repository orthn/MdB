import {Injectable} from '@angular/core';
import {UserSettings} from '../models/User';
import {Router} from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenKey = 'jwtToken';

  constructor(private router: Router) {}

  // ==============================
  // TOKEN
  // ==============================
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // ==============================
  // USER (decoded from JWT)
  // ==============================
  getUser(): any | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        this.logout();
        return null;
      }
      return decoded;
    } catch {
      this.logout();
      return null;
    }
  }

  // ==============================
  // AUTH STATE
  // ==============================
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isTeacher(): boolean {
    return this.getUser()?.role === 'teacher';
  }

  // ==============================
  // LOGOUT
  // ==============================
  logout(): void {
    this.removeToken();
    this.router.navigate(['/login']);
  }

  // ==============================
  // SETTINGS
  // ==============================
  applySettings(settings: UserSettings): void {
    const user = this.getUser()
    user.settings.showAnimations = settings?.showAnimations ?? true;
    user.settings.showHints = settings?.showHints ?? true;
    user.settings.theme = settings?.theme ?? 'dark';

    if (user.settings.showAnimations) {
      document.body.classList.remove('no-animations');
    } else {
      document.body.classList.add('no-animations');
    }
  }
}
