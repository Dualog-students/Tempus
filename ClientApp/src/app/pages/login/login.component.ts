import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) {}

  ngOnInit(): void {}

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    const status = this.loginService.login(this.loginForm.value);
    if (status === undefined) {
      console.warn('Email does not exist!');
      return;
    } else if (status === false) {
      console.warn('Wrong email or password!');
      return;
    }

    console.log('You are logged in :)');
  }
}
