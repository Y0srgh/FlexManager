import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'];
    const userRole = this.auth.getCurrentUserRole();
    
    if (!this.auth.isAuthenticated() ) {
      this.router.navigate(['/']);
      return false;
    }
    if (!expectedRoles.includes(userRole)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}