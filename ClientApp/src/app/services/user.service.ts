import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { SessionService } from './session.service';
import { UserProviderService } from './api/user-provider.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user = new EventEmitter<User>();
  private _user: User;

  constructor(
    private sessionService: SessionService,
    private userProvider: UserProviderService,
  ) {}

  public async getCurrentUser(): Promise<User> {
    if (!this._user) {
      try {
        // First time or refresh
        const token = this.sessionService.getToken();
        const user = await this.userProvider.getUser(token);
        this.setUser(user);
        return this._user;
      } catch (e) {
        return null;
      }
    }

    return this._user;
  }

  public async fetchUser(id: string) {
    // Called only on login
    const token = this.sessionService.getToken();
    const user = await this.userProvider.getUser(token);
    this.setUser(user);
  }

  private setUser(user: User) {
    this._user = user;
    this.user.emit(user);
  }

  public removeUser() {
    this.setUser(new User());
  }

  public get isLoggedIn(): boolean {
    try {
      const token = this.sessionService.getToken();
      return !!token;
    } catch (e) {
      return false;
    }
  }
}
