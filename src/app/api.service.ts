import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { SessionService } from "./session.service";
import { MessageService } from "./message.service";
import {
  ClientRoutes,
  FieldRoutes,
  EventRoutes,
  AlertTypeRoutes,
  EventWarningRoutes
} from "./routes";
import { ClientItem } from "./models/client";
import { FieldItem } from "./models/field";
import { EventItem } from "./models/event";
import { AlertTypeItem } from "./models/alertType";
import { EventWarningItem } from "./models/eventWarning";
import { EventTypeItem } from "./models/eventType";

@Injectable({
  providedIn: "root"
})
export class ApiService {
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

  public createField(field: FieldItem): Observable<FieldItem> {
    const options = this.getRequestOptions();
    return this.http
      .post<FieldItem>(
        FieldRoutes.default(),
        {
          field: {
            name: field.name,
            description: field.description,
            email: field.email,
            address: field.address,
            city: field.city,
            state: field.state,
            postalCode: field.postalCode,
            active: field.active,
            client: field.client
          }
        },
        options
      )
      .pipe(
        tap(_ => this.log(`Created field`)),
        catchError(this.handleError)
      );
  }

  public updateField(field: FieldItem): Observable<FieldItem> {
    const options = this.getRequestOptions();
    return this.http
      .put<FieldItem>(
        FieldRoutes.default(),
        {
          field: {
            id: field._id,
            name: field.name,
            description: field.description,
            email: field.email,
            address: field.address,
            city: field.city,
            state: field.state,
            postalCode: field.postalCode,
            active: field.active,
            client: field.client
          }
        },
        options
      )
      .pipe(
        tap(_ => this.log(`Updated field`)),
        catchError(this.handleError)
      );
  }

  public getEvents(): Observable<EventItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<EventItem[]>(EventRoutes.default(), options).pipe(
      tap(_ => this.log(`Fetched all events`)),
      catchError(this.handleError)
    );
  }

  public getEventsByField(fieldId: string): Observable<EventItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<EventItem[]>(FieldRoutes.eventsFromField(fieldId), options)
      .pipe(
        tap(_ => this.log(`Fetched all field's events`)),
        catchError(this.handleError)
      );
  }

  public createEvent(event: EventItem): Observable<EventItem> {
    const options = this.getRequestOptions();
    return this.http
      .post<EventItem>(
        EventRoutes.default(),
        {
          event: {
            date: event.date,
            eventType: event.eventType,
            field: event.field,
            active: event.active
          }
        },
        options
      )
      .pipe(
        tap(_ => this.log(`Created event`)),
        catchError(this.handleError)
      );
  }

  public getEventTypes(): Observable<EventTypeItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<any>(EventRoutes.default(), options).pipe(
      map(result => result.eventTypes),
      tap(_ => this.log(`Fetched all event types`)),
      catchError(this.handleError)
    );
  }

  public getAlertTypes(): Observable<AlertTypeItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<any>(AlertTypeRoutes.default(), options).pipe(
      map(result => result.alertTypes),
      tap(_ => this.log(`Fetched all alert types`)),
      catchError(this.handleError)
    );
  }

  public updateEventStatus(
    eventWarning: EventWarningItem
  ): Observable<EventWarningItem> {
    const options = this.getRequestOptions();
    return this.http
      .patch<EventWarningItem>(
        EventWarningRoutes.byId(eventWarning.id),
        {
          eventWarning: {
            solved: eventWarning.solved
          }
        },
        options
      )
      .pipe(
        tap(_ => this.log(`Updated event warning`)),
        catchError(this.handleError)
      );
  }

  public getFields(): Observable<FieldItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<FieldItem[]>(FieldRoutes.default(), options).pipe(
      tap(_ => this.log(`Fetched all fields`)),
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
