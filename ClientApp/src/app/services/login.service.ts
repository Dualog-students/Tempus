import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { BaseApiService, ApiOptions } from '../services/api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseApiService {
  constructor(protected apiOptions: ApiOptions) {
    super(apiOptions);
  }

  async authencicateUser(user: any) {
    const url = 'authenticate-user';
    const httpOptions = {
      header: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return await super.post(url, user, httpOptions).toPromise();
  }

  async registerUser(user: any) {
    const url = 'authenticate-user';
    const httpOptions = {
      header: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return await super.post(url, user, httpOptions).toPromise();
  }
}
