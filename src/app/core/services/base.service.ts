import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, finalize, take } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  private defaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json',
    });
    return headers;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  public get(url: string, headers: HttpHeaders = this.defaultHeaders()): any {
    // open loading component
    return this.http.get(environment.url + url, { headers }).pipe(
      catchError((error) => this.handleError(error)),
      finalize(() => {
        console.log('finished');
        // close loading component
      })
    );
  }
}
