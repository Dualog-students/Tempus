import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { RegisterUser } from '../../../models/registerUser.model';
import positions from '../../../../assets/positions.json';
import {
  passwordValidator,
  confirmPasswordValidator,
} from '../../../validators/password.validator';
import { partTimePercentValidator } from '../../../validators/part-time-percentage.validator';

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
  options = positions.map(x => {
    return { position: x };
  });
  isFullTime = true;
  passwordLength = 6;

  signUpForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@dualog.com$/),
    ]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    partTimePercentage: new FormControl(100),
    position: new FormControl('', [Validators.required]),
    otherPosition: new FormControl(''),
  });

  get otherOption(): string {
    return this.signUpForm.controls.position.value.position;
  }

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.signUpForm.controls.password.setValidators([
      Validators.required,
      passwordValidator(this.signUpForm.controls.password),
    ]);
    this.signUpForm.controls.confirmPassword.setValidators([
      Validators.required,
      confirmPasswordValidator(
        this.signUpForm.controls.confirmPassword,
        this.signUpForm.controls.password,
      ),
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
        partTimePercentValidator(this.signUpForm.controls.partTimePercentage),
      );
    }
  }

  async onSignUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }
    const form = { ...this.signUpForm.value };
    form.position = form.position.position;
    const user: RegisterUser = form;

    const response = await this.loginService.registerUser(user);
    if (!response) {
      this.error = true;
      return;
    }
    this.router.navigate(['/home']);
  }
}
