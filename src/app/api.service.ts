import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { MessageService } from './message.service';
import { Token } from './token';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionService,
    private messageService: MessageService
  ) {
  }

  public signIn(email: string, password: string): Observable<Token> {
    return this.http
      .post<Token>(API_URL + '/users/login', {
        'user': {
          'email': email,
          'password': password
        }
      }).pipe(
        tap(_ => this.log(`Logged in (email=${email})`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | any) {
    return Observable.throw(error);
  }

  private getRequestOptions(email: string) {
    const headers = new HttpHeaders({
      'authorization': 'Token ' + this.session.retrieve().token
    });
    return { headers };
  }

  private log(message: string) {
    this.messageService.add(`API Service: ${message}`);
  }
}
