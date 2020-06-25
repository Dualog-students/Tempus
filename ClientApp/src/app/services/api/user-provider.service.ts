import { Injectable } from '@angular/core';
import { BaseApiService, ApiOptions } from './base-api.service';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserProviderService extends BaseApiService {
  constructor(protected apiOptions: ApiOptions) {
    super(apiOptions);
  }

  login = (email: string, password: string): Promise<string> =>
    super.post<string>('authenticate-user', {
      Email: email,
      Password: password,
    });

  register = (user: User): Promise<string> =>
    super.post<string>('register-user', user);

    getUser = (id: string): Promise<User> => super.get<User>('users/' + id);
}
