import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor() {} // private databaseAPIService: DatabaseAPIService;

  login(user: any) {
    console.log('Email: ' + user.email);
    console.log('Password: ' + user.password);
    // const canLogIn = this.databaseAPIService.get({'user': user);
    return true;
  }
}
