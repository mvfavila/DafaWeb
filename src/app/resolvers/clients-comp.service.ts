import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../api.service';
import { ClientItem } from '../models/client';

@Injectable()
export class ClientsCompResolver implements Resolve<ClientItem[]> {

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClientItem[]> {
    return this.api.getClients()
    .pipe(
      map((result) => {
        return result;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse | any) {
    // this._ngAlert.push({
    //   message: error.message,
    //   type: '' // MessageType.error
    // });
    return throwError(error.message || error);
  }

}
