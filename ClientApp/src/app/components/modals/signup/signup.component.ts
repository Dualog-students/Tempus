import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { RegisterUser } from '../../../models/registerUser.model';
import positions from '../../../../assets/positions.json';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();
  error = false;
  errorMsg = 'Email is already taken';
  options = positions.map((x) => {
    return { position: x };
  });
  isFullTime = true;
  passwordRegexNumber = /\d+/g;
  passwordRegexCapitalized = /[A-Z]+/g;
  passwordRegexNonCapitalized = /[a-z]+/g;
  passwordRegexSymbol = /[^\w\s]+/g;
  passwordLength = 6;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    partTimePercentage: new FormControl(100),
    position: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm.controls.password.setValidators([
      Validators.required,
      this.passwordValidator(),
    ]);
    this.signUpForm.controls.confirmPassword.setValidators([
      Validators.required,
      this.confirmPasswordValidator(),
    ]);
  }

  closeModal() {
    this.modal = false;
    this.modalChange.emit(this.modal);
  }

  onPartTime(checked: boolean) {
    this.isFullTime = checked;
    if (this.isFullTime) {
      this.signUpForm.controls.partTimePercentage.clearValidators();
      this.signUpForm.controls.partTimePercentage.reset();
      this.signUpForm.controls.partTimePercentage.setValue(100);
    } else {
      this.signUpForm.controls.partTimePercentage.setValidators(
        this.percentValidator(),
      );
    }
  }

  async onSignUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const form = this.signUpForm.value;
    form.position = form.position.position;
    const user: RegisterUser = form;

    const response = await this.loginService.registerUser(user);
    if (!response) {
      this.error = true;
      return;
    }
    this.router.navigate(['/home']);
  }

  percentValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value < 10 || control.value > 90) {
        return { error: 'Number has to be between 10 and 90' };
      }
      return null;
    };
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (control.pristine || control.value.length < this.passwordLength) {
        error =
          'Password must have atleast ' + this.passwordLength + ' characters';
      } else if (!control.value.match(this.passwordRegexNonCapitalized)) {
        error = 'Password must have atleast 1 non capitalized letter';
      } else if (!control.value.match(this.passwordRegexCapitalized)) {
        error = 'Password must have atleast 1 capitalized letter';
      } else if (!control.value.match(this.passwordRegexNumber)) {
        error = 'Password must have atleast 1 number';
      } else if (!control.value.match(this.passwordRegexSymbol)) {
        error = 'Password must have atleast 1 symbol';
      }
      if (error) {
        return { error };
      }
      return null;
    };
  }

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== this.signUpForm.value.password) {
        return { error: 'Passwords is not equal' };
      }
      return null;
    };
  }
}
