import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { Login } from './login/login';
import { Token } from './token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private session: SessionService,
    private messageService: MessageService,
    private router: Router
  ) {
  }

  public getToken() {
    return this.session.retrieve();
  }

  public isSignedIn(): boolean {
    return this.session.hasValidToken();
  }

  public doSignIn(tokenObj: Token) {
    if (!tokenObj.token) {
      return;
    }

    this.session.store(tokenObj.token);
    this.router.navigate(['/dashboard']);
  }

  public doSignOut() {
    this.session.deleteEntry();
    this.router.navigate(['/sign-in']);
  }

}
