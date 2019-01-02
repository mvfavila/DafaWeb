import { Injectable } from '@angular/core';
import { sessionstorage } from 'sessionstorage';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from './token';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private key = 'user-data';

  constructor() { }

  public destroy(): void {
    sessionstorage.clear();
  }

  public store(rawToken: string): void {
    sessionStorage.setItem(this.key, rawToken);
  }

  public deleteEntry(): void {
    sessionStorage.removeItem(this.key);
  }

  public retrieve(): Token {
    const rawToken = sessionStorage.getItem(this.key);
    if (rawToken === null) { return new Token(); }

    const tokenObj = new Token();
    tokenObj.token = rawToken;

    return tokenObj;
  }

  public hasValidToken(): boolean {
    const tokenObj = this.retrieve();

    return !tokenObj.isExpired();
  }
}
