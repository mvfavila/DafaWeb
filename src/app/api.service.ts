import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { SessionService } from './session.service';
import { MessageService } from './message.service';
import { Token } from './token';
import { ClientItem } from './models/client';
import { EventWarningFieldItem } from './models/eventWarningField';

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

  public getClients(): Observable<ClientItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<ClientItem[]>(API_URL + '/clients', options)
      .pipe(
        tap(_ => this.log(`Fetched all clients`)),
        catchError(this.handleError)
      );
  }

  public createClient(client: ClientItem): Observable<ClientItem> {
    const options = this.getRequestOptions();
    return this.http
      .post<ClientItem>(API_URL + '/clients', {
        'client': {
          'firstName': client.firstName,
          'lastName': client.lastName,
          'company': client.company,
          'address': client.address,
          'city': client.city,
          'state': client.state,
          'postalCode': client.postalCode,
          'email': client.email,
          'active': client.active,
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Created client`)),
        catchError(this.handleError)
      );
  }

  public updateClient(client: ClientItem): Observable<ClientItem> {
    const options = this.getRequestOptions();
    return this.http
      .put<ClientItem>(API_URL + '/clients', {
        'client': {
          'id': client._id,
          'firstName': client.firstName,
          'lastName': client.lastName,
          'company': client.company,
          'address': client.address,
          'city': client.city,
          'state': client.state,
          'postalCode': client.postalCode,
          'email': client.email,
          'active': client.active,
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Updated client`)),
        catchError(this.handleError)
      );
  }

  public getEventWarningsFields(): Observable<EventWarningFieldItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<EventWarningFieldItem[]>(API_URL + '/eventWarningsFields', options)
      .pipe(
        tap(_ => this.log(`Fetched all event warnings from fields`)),
        catchError(this.handleError)
      );
  }

  public updateEventWarningStatus(eventWarning: EventWarningFieldItem): Observable<EventWarningFieldItem> {
    const options = this.getRequestOptions();
    return this.http
      .patch<EventWarningFieldItem>(`${API_URL}/eventWarningField/${eventWarning.idEventWarning}`, {
        'eventWarning': {
          'solved': eventWarning.solved
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Updated event warning`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | any) {
    return throwError(error.message || error);
  }

  private getRequestOptions() {
    const headers = new HttpHeaders({
      'authorization': 'Token ' + this.session.retrieve().token
    });
    return { headers };
  }

  private log(message: string) {
    this.messageService.add(`API Service: ${message}`);
  }
}
