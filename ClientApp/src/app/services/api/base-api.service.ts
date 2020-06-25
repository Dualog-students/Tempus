import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
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
  defaultPostOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    responseType: 'text',
    observe: 'response',
  };
  defaultGetOptions = {
    responseType: 'json',
    observe: 'response',
  };

  constructor(protected apiOptions: ApiOptions) {}

    async get<T>(
    _url: string,
    httpOptions: any = this.defaultGetOptions,
    ): Promise<HttpResponse<T>> {
    const url = this.apiUrl + _url;
    const request = this.apiOptions.httpClient
      .get(url, httpOptions)
      .toPromise();

    return request.then(
        (response: HttpResponse<T>) => {
        return response;
      },
        (error: HttpErrorResponse) => {
        return error;
      },
    );
  }

    async post<T>(
    _url: string,
    object: any,
    httpOptions: any = this.defaultPostOptions,
    ): Promise<HttpResponse<T>> {
    const url = this.apiUrl + _url;
    const request = this.apiOptions.httpClient
      .post(url, object, httpOptions)
      .toPromise();

    return request.then(
        (response: HttpResponse<T>) => {
        return response;
      },
        (error: HttpErrorResponse) => {
        return error;
      },
    );
  }
}
