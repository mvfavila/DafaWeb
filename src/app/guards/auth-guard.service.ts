import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isSignedIn()) {
        return true;
    }

    this._router.navigate(['/sign-in']);
    // TODO: save redirect url so after authing move back to the page requested
    return false;
  }

}
