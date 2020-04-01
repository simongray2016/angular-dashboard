import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  user: any;

  constructor (private authService: AuthService, private router: Router) {
    this.authService.user$.subscribe(user => this.user = user);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.user) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  canActivateChild(): boolean {
    return true;
  }
  canLoad(): boolean {
    return true;
  }
}
