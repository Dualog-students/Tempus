import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  tokenKey: string;

  constructor() {
    this.tokenKey = 'TempusToken';
  }

  setToken(token: string) {
    sessionStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    const token = sessionStorage.getItem(this.tokenKey);
    return token;
  }

  removeToken() {
    sessionStorage.removeItem(this.tokenKey);
  }
}
