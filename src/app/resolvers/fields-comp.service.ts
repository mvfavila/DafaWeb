import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { FieldItem } from '../models/field';

@Injectable()
export class FieldsCompResolver implements Resolve<FieldItem[]> {

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FieldItem[]> {
    const clientId = route.paramMap.get('id');
    if (clientId) {
      return this.api.getFieldsByClient(clientId)
      .pipe(
        map((result) => {
          return result;
        }),
        catchError(this.handleError)
      );
    } else {
      return this.api.getFields()
      .pipe(
        map((result) => {
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
