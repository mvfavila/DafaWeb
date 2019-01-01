import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { MessageService } from './message.service';
import { UserSession } from './session';
import { Router } from '@angular/router';

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

  public decode(): UserSession {
    return this.session.retrieve();
  }

  public isSignedIn(): boolean {
    return this.session.exists() && !this.session.isExpired();
  }

  public doSignIn(accessToken: string, username: string, email: string) {
    if ((!accessToken) || (!email)) {
      return;
    }
    const userSession = new UserSession();
    userSession.email = email;
    userSession.username = username;
    userSession.token = accessToken;

    this.session.store(userSession);
    this.log(`Session creted for ${email}`);

    this.router.navigate(['/dashboard']);
  }

  public doSignOut() {
    this.session.deleteEnty();
    this.log('Signed out');
    this.router.navigate(['/sign-in']);
  }

  private log(message: string) {
    this.messageService.add(`Auth Service: ${message}`);
  }

}
