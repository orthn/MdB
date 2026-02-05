import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'];
    const user = this.userService.getUser();

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (!expectedRoles.includes(user.role)) {
      // redirect students away from teacher pages
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
