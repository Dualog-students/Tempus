import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

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
  modal: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.modal = false;
  }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const response = this.loginService.login(this.loginForm.value);
    const mockResponse = {
      status: 200,
    };

    if (mockResponse.status !== 200) {
      console.warn('Wrong email or password!');
      return;
    }

    console.log('You are logged in :)');
    this.router.navigate(['/home']);
  }

  onSignUp() {
    console.log('Signing up');
    this.modal = true;
  }
}
