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
  error = false;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  async ngOnInit() {}

  async onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const response = await this.loginService.authencicateUser(
      this.loginForm.value
    );

    if (response.status !== 200) {
      this.errorMsg = 'Wrong email or password!';
      this.error = true;
      return;
    }
    this.login(response.body);
  }

  login(userId: any) {
    this.router.navigate(['/home']);
  }

  onSignUp() {
    this.modal = true;
  }
}
