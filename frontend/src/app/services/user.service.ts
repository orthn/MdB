import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userKey = 'currentUser';
  private jwtToken = 'jwtToken';

  constructor() {
  }

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

  applyAnimationPreference(showAnimations: boolean) {
    this.getUser().settings.showAnimations = showAnimations;
    if (!showAnimations) {
      document.body.classList.add('no-animations');
    } else {
      document.body.classList.remove('no-animations');
    }
  }
}
