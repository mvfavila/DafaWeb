import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Resolve
} from "@angular/router";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { EventApiService } from "../services/event.api.service";
import { FieldApiService } from "../services/field.api.service";
import { EventItem } from "../models/event";

@Injectable()
export class EventsCompResolver implements Resolve<EventItem[]> {
  public constructor(
    private eventApi: EventApiService,
    private fieldApi: FieldApiService
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<EventItem[]> {
    const fieldId = route.paramMap.get("id");
    if (fieldId) {
      return this.fieldApi.getEventsByField(fieldId).pipe(
        map(result => {
          return result;
        }),
        catchError(this.handleError)
      );
    } else {
      return this.eventApi.getEvents().pipe(
        map(result => {
          return result;
        }),
        catchError(this.handleError)
      );
    }
  }

  private handleError(error: HttpErrorResponse | any) {
    // this._ngAlert.push({
    //   message: error.message,
    //   type: '' // MessageType.error
    // });
    return throwError(error.message || error);
  }
}
