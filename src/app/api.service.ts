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
import { Login } from './login/login';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private session: SessionService
  ) {
  }

  public signIn(email: string, password: string): Observable<any> {
    return this.http
      .post(API_URL + '/users/login', {
        'user': {
          'email': email,
          'password': password
        }
      }).pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

  private getRequestOptions() {
    const headers = new HttpHeaders({
      'authorization': 'Token ' + this.session.accessToken
    });
    return { headers };
  }
}
