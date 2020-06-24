import { Injectable } from '@angular/core';

import { BaseApiService, ApiOptions } from '../services/api/base-api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseApiService {
  constructor(protected apiOptions: ApiOptions) {
    super(apiOptions);
  }

  async authencicateUser(user: any) {
    return await super.post('authenticate-user', user).toPromise();
  }

  async registerUser(user: any) {
    return await super.post('register-user', user).toPromise();
  }

  async getUsers() {
    return await super.get('users').toPromise();
  }
}
