import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { MessageService } from './message.service';
import { Token } from './token';
import { ClientItem } from './models/client';
import { FieldItem } from './models/field';
import { EventItem } from './models/event';
import { AlertTypeItem } from './models/alertType';
import { EventWarningItem } from './models/eventWarning';
import { EventTypeItem } from './models/eventType';

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

  public createField(field: FieldItem): Observable<FieldItem> {
    const options = this.getRequestOptions();
    return this.http
      .post<FieldItem>(API_URL + '/fields', {
        'field': {
          'name': field.name,
          'description': field.description,
          'email': field.email,
          'address': field.address,
          'city': field.city,
          'state': field.state,
          'postalCode': field.postalCode,
          'active': field.active,
          'client': field.client,
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Created field`)),
        catchError(this.handleError)
      );
  }

  public updateField(field: FieldItem): Observable<FieldItem> {
    const options = this.getRequestOptions();
    return this.http
      .put<FieldItem>(API_URL + '/fields', {
        'field': {
          'id': field.id,
          'name': field.name,
          'description': field.description,
          'email': field.email,
          'address': field.address,
          'city': field.city,
          'state': field.state,
          'postalCode': field.postalCode,
          'active': field.active,
          'client': field.client,
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Updated field`)),
        catchError(this.handleError)
      );
  }

  public getEvents(): Observable<EventItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<EventItem[]>(API_URL + '/events', options)
      .pipe(
        tap(_ => this.log(`Fetched all events`)),
        catchError(this.handleError)
      );
  }

  public createEvent(event: EventItem): Observable<EventItem> {
    const options = this.getRequestOptions();
    return this.http
      .post<EventItem>(API_URL + '/events', {
        'event': {
          'date': event.date,
          'eventType': event.eventType,
          'field': event.field,
          'active': event.active,
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Created event`)),
        catchError(this.handleError)
      );
  }

  public getEventTypes(): Observable<EventTypeItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<any>(API_URL + '/eventTypes', options)
      .pipe(
        map(result => result.eventTypes),
        tap(_ => this.log(`Fetched all event types`)),
        catchError(this.handleError)
      );
  }

  public getAlertTypes(): Observable<AlertTypeItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<any>(API_URL + '/alertTypes', options)
      .pipe(
        map(result => result.alertTypes),
        tap(_ => this.log(`Fetched all alert types`)),
        catchError(this.handleError)
      );
  }

  public updateEventStatus(event: EventWarningItem): Observable<EventWarningItem> {
    const options = this.getRequestOptions();
    return this.http
      .patch<EventWarningItem>(`${API_URL}/eventWarnings/${event.id}`, {
        'eventWarning': {
          'solved': event.solved
        }
      }, options)
      .pipe(
        tap(_ => this.log(`Updated event warning`)),
        catchError(this.handleError)
      );
  }

  public getFields(): Observable<FieldItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<FieldItem[]>(API_URL + '/fields', options)
      .pipe(
        tap(_ => this.log(`Fetched all fields`)),
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
