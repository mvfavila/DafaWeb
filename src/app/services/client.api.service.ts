import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { SessionService } from "../session.service";
import { MessageService } from "../message.service";
import { ClientRoutes } from "../routes";
import { ClientItem } from "../models/client";
import { FieldItem } from "../models/field";
@Injectable({
  providedIn: "root"
})
export class ClientApiService {
  private constructor(
    private readonly http: HttpClient,
    private readonly session: SessionService,
    private readonly messageService: MessageService
  ) {}

  public getClients(): Observable<ClientItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<ClientItem[]>(ClientRoutes.default(), options).pipe(
      tap(_ => this.log(`Fetched all clients`)),
      catchError(this.handleError)
    );
  }

  public createClient(client: ClientItem): Observable<ClientItem> {
    const options = this.getRequestOptions();
    return this.http
      .post<ClientItem>(
        ClientRoutes.default(),
        {
          client: {
            firstName: client.firstName,
            lastName: client.lastName,
            company: client.company,
            address: client.address,
            city: client.city,
            state: client.state,
            postalCode: client.postalCode,
            email: client.email,
            active: client.active
          }
        },
        options
      )
      .pipe(
        tap(_ => this.log(`Created client`)),
        catchError(this.handleError)
      );
  }

  public updateClient(client: ClientItem): Observable<ClientItem> {
    const options = this.getRequestOptions();
    return this.http
      .put<ClientItem>(
        ClientRoutes.default(),
        {
          client: {
            id: client._id,
            firstName: client.firstName,
            lastName: client.lastName,
            company: client.company,
            address: client.address,
            city: client.city,
            state: client.state,
            postalCode: client.postalCode,
            email: client.email,
            active: client.active
          }
        },
        options
      )
      .pipe(
        tap(_ => this.log(`Updated client`)),
        catchError(this.handleError)
      );
  }

  public getFieldsByClient(clientId: string): Observable<FieldItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<FieldItem[]>(ClientRoutes.fieldsByClient(clientId), options)
      .pipe(
        tap(_ => this.log(`Fetched all client's fields`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | any): Observable<never> {
    return throwError(error.message || error);
  }

  private getRequestOptions(): Record<string, HttpHeaders> {
    const headers = new HttpHeaders({
      authorization: "Token " + this.session.retrieve().token
    });
    return { headers };
  }

  private log(message: string): void {
    this.messageService.add(`API Service: ${message}`);
  }
}
