import { Injectable } from '@angular/core';

import { UserProviderService } from '../services/api/user-provider.service';
import { UserService } from '../services/user.service';
import { SessionService } from '../services/session.service';
import { User } from '../models/user.model';

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
    return this.userProvider.login(email, password).then(
      async (response: string) => {
        this.sessionService.setToken(response);
        await this.userService.fetchUser(response);
        return true;
      },
      (error: any) => {
        return false;
      },
    );
  }

  async registerUser(user: User) {
    return this.userProvider.register(user).then(async (response: any) => {
      if (response.status === 200) {
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
