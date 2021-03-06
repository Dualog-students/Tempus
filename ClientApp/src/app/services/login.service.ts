import { Injectable } from '@angular/core';

import { UserProviderService } from '../services/api/user-provider.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { RegisterUser } from '../models/registerUser.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private userProvider: UserProviderService,
    private userService: UserService,
    private sessionService: SessionService,
  ) {}

  async authencicateUser(email: string, password: string): Promise<boolean> {
    return this.userProvider
      .login(email, password)
      .then(async (response: any) => {
        if (typeof response === 'string') {
          this.sessionService.setToken(response);
          await this.userService.fetchUser(response);
          return true;
        }
        return false;
      });
  }

  async registerUser(user: RegisterUser) {
    return this.userProvider.register(user).then(async (response: string) => {
      if (typeof response === 'string') {
        this.authencicateUser(user.email, user.password);
        return true;
      }
      return false;
    });
  }

  logout() {
    this.sessionService.removeToken();
    this.userService.removeUser();
  }
}
