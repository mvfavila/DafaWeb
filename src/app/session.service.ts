import { Injectable } from '@angular/core';
import { sessionstorage } from 'sessionstorage';
import { UserSession } from './session';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private key = 'user-data';

  constructor() { }

  public destroy(): void {
    sessionstorage.clear();
  }

  public store(content: UserSession): void {
    sessionStorage.setItem(this.key, JSON.stringify(content));
  }

  public deleteEnty(): void {
    sessionStorage.removeItem(this.key);
  }

  public retrieve(): UserSession {
    const item = sessionStorage.getItem(this.key);
    if (item === null) { return new UserSession(); }

    return JSON.parse(sessionStorage.getItem(this.key));
  }

  public exists(): boolean {
    return !!this.retrieve().token && !this.isExpired();
  }

  public isExpired(): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(this.retrieve().token);
  }
}
