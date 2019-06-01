import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { MessageService } from "../message.service";
import { Token } from "../token";
import { UserRoutes } from "../routes";

@Injectable({
  providedIn: "root"
})
export class UserApiService {
  public constructor(
    private readonly http: HttpClient,
    private readonly messageService: MessageService
  ) {}

  public signIn(email: string, password: string): Observable<Token> {
    const url = UserRoutes.signIn();
    return this.http
      .post<Token>(url, {
        user: {
          email: email,
          password: password
        }
      })
      .pipe(
        tap(_ => this.log(`Logged in (email=${email})`)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse | any): Observable<never> {
    return throwError(error.message || error);
  }

  private log(message: string): void {
    this.messageService.add(`API Service: ${message}`);
  }
}
