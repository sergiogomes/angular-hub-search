import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public loading$: Subject<boolean> = new Subject<boolean>();
  get eventLoadingChanged(): Observable<any> {
    return this.loading$.asObservable();
  }

  constructor(private http: HttpClient) {}

  private defaultHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json',
    });
    return headers;
  }

  public get(url: string, headers: HttpHeaders = this.defaultHeaders()): any {
    this.loading$.next(true);
    return new Promise((resolve, reject) => {
      this.http
        .get(environment.url + url, { headers })
        .toPromise()
        .then(
          (res) => {
            resolve(res);
            this.loading$.next(false);
          },
          (err) => {
            reject(err);
            this.loading$.next(false);
          }
        );
    });
  }
}
