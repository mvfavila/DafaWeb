import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";
import { SessionService } from "../session.service";
import { MessageService } from "../message.service";
import { AlertTypeRoutes } from "../routes";
import { AlertTypeItem } from "../models/alertType";

@Injectable({
  providedIn: "root"
})
export class AlertTypeApiService {
  private constructor(
    private readonly http: HttpClient,
    private readonly session: SessionService,
    private readonly messageService: MessageService
  ) {}

  public getAlertTypes(): Observable<AlertTypeItem[]> {
    const options = this.getRequestOptions();
    return this.http.get<any>(AlertTypeRoutes.default(), options).pipe(
      map(result => result.alertTypes),
      tap(_ => this.log(`Fetched all alert types`)),
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
