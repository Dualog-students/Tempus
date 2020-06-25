import { Injectable } from '@angular/core';

import { UserProviderService } from '../services/api/user-provider.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private userProvider: UserProviderService,
    private userService: UserService,
  ) {}

  async authencicateUser(email: string, password: string): Promise<boolean> {
    return this.userProvider
      .login(email, password)
      .then(async (response: any) => {
        if (response.status === 200) {
          await this.userService.fetchUser(response.body);
          return true;
        }
        return false;
      });
  }

  async registerUser(user: User) {
    return this.userProvider.register(user).then(async (response: any) => {
      if (response.status === 200) {
        return true;
      }
      return false;
    });
  }
}
