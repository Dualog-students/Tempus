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
  options = [{ position: 'Manager' }, { position: 'Intern' }];
  isFullTime = true;

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

  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value !== this.signUpForm.value.password) {
        return { error: 'Passwords is not equal' };
      }
      return null;
    };
  }
}
