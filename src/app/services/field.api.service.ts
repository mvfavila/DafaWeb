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
import { FieldRoutes } from "../routes";
import { FieldItem } from "../models/field";
import { EventItem } from "../models/event";

@Injectable({
  providedIn: "root"
})
export class FieldApiService {
  private constructor(
    private readonly http: HttpClient,
    private readonly session: SessionService,
    private readonly messageService: MessageService
  ) {}

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

  public getEventsByField(fieldId: string): Observable<EventItem[]> {
    const options = this.getRequestOptions();
    return this.http
      .get<EventItem[]>(FieldRoutes.eventsFromField(fieldId), options)
      .pipe(
        tap(_ => this.log(`Fetched all field's events`)),
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
