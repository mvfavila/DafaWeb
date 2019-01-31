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
