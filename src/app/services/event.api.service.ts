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
import { EventRoutes } from "../routes";
import { EventItem } from "../models/event";

@Injectable({
  providedIn: "root"
})
export class EventApiService {
  private constructor(
    private readonly http: HttpClient,
    private readonly session: SessionService,
    private readonly messageService: MessageService
  ) {}

  public getEvents(): Observable<EventItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<EventItem[]>(EventRoutes.default(), options).pipe(
      tap(_ => this.log(`Fetched all events`)),
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
