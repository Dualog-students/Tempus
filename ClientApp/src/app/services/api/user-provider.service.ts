import { Injectable } from '@angular/core';
import { BaseApiService, ApiOptions } from './base-api.service';
import { User } from '../../models/user.model';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserProviderService extends BaseApiService {
  constructor(protected apiOptions: ApiOptions) {
    super(apiOptions);
  }

  login = (email: string, password: string): Promise<HttpResponse<boolean>> =>
    super.post<boolean>('authenticate-user', {
      Email: email,
      Password: password,
    });

  register = (user: User): Promise<HttpResponse<boolean>> =>
    super.post<boolean>('register-user', user);

  getUser = (id: string): Promise<HttpResponse<User>> =>
    super.get<User>('user');
}
