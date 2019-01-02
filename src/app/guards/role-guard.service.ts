import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const tokenObj = this._authService.getToken();
    const userRoles = tokenObj.decode().roles;
    const allowedRoles = next.data.roles;

    const hasRole = userRoles.filter(value => -1 !== allowedRoles.indexOf(value)).length > 0;

    if (hasRole) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }

}
