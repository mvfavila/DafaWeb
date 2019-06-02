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
import { EventWarningRoutes } from "../routes";
import { EventWarningItem } from "../models/eventWarning";

@Injectable({
  providedIn: "root"
})
export class EventWarningApiService {
  private constructor(
    private readonly http: HttpClient,
    private readonly session: SessionService,
    private readonly messageService: MessageService
  ) {}

  public updateEventWarningStatus(
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
