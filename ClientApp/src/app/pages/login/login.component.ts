import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  modal = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  async ngOnInit() { }

  async onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(['Users', await this.loginService.getUsers()]);
    const response = await this.loginService.authencicateUser(
      this.loginForm.value
    );
    console.log(['Authentication', response]);

    if (response.status !== 200) {
      console.warn('Wrong email or password!');
      return;
    }
    this.login(response.body);
  }

  login(userId: any) {
    console.log(['Logged in as user:', userId]);
    this.router.navigate(['/home']);
  }

  onSignUp() {
    console.log('Signing up');
    this.modal = true;
  }
}
