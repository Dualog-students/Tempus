import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {}

  login(email: string, password: string) {
    console.log('Email: ' + email);
    console.log('Password: ' + password);
  }
}
