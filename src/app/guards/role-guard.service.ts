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

    const roles = tokenObj.decode().roles.map(function(item) {
      this.log(`User has role: ${item}`);
      return item + '';
    });

    const hasRole = roles.indexOf(next.data.role) > -1;

    if (hasRole) {
      return true;
    }

    // navigate to not found page
    this._router.navigate(['/404']);
    return false;
  }

}
