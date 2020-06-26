import { Injectable } from '@angular/core';
import { BaseApiService, ApiOptions } from './base-api.service';
import { RegisterUser } from '../../models/RegisterUser.model';

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

  register = (user: RegisterUser): Promise<string> =>
    super.post<string>('register-user', user);

  getUser = (id: string): Promise<User> => super.get<User>('users/' + id);

  getAllUsers = (): Promise<User[]> => super.get<User[]>('users');

  updateUserField = (id: string, field: string, value: string) =>
    super.post<string>(id + '/update-user-field', {
      Field: field,
      Value: value,
    });
}
