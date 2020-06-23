import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiOptions {
  constructor(public httpClient: HttpClient) {}
}
export class BaseApiService {
  public apiUrl = 'http://localhost:5000/';

  constructor(protected apiOptions: ApiOptions) {}

  get<T>(url: string): Observable<T> {
    return Observable.create((observer) => {
      this.apiOptions.httpClient
        .get<T>(this.apiUrl + url, { responseType: 'json' })
        .pipe(first(), catchError(this.handleError<T>('get', observer)))
        .subscribe((result) => {
          observer.next(result);
          observer.complete();
        });
    });
  }

  post<T>(url: string, object: any, httpOptions: any) {
    return Observable.create((observer) => {
      this.apiOptions.httpClient
        .post<T>(this.apiUrl + url, object, httpOptions)
        .pipe(first(), catchError(this.handleError('post', observer)))
        .subscribe((result) => {
          observer.next(result);
          observer.complete();
        });
    });
  }

  observablePost(url: string, object: any, httpOptions: any) {
    return this.apiOptions.httpClient.post<any>(
      this.apiUrl + url,
      object,
      httpOptions
    );
  }

  handleError<T>(method = '', observer, result?: T) {
    return (error: any): Observable<T> => {
      // Just return null for everything that fails
      observer.next(null);
      observer.complete();
      return of(null);
    };
  }
}
