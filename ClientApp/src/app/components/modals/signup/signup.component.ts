import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();
  error: boolean = false;
  errorMsg: string = 'Email is already taken';
  options = [{ position: 'Manager' }, { position: 'Intern' }];
  isFullTime: boolean = true;

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    partTimePercentage: new FormControl(null),
    position: new FormControl('', [Validators.required]),
  });

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal = false;
    this.modalChange.emit(this.modal);
  }

  onPartTime(checked: boolean) {
    this.isFullTime = checked;
    if (this.isFullTime) {
      this.signUpForm.controls.partTimePercentage.clearValidators();
      this.signUpForm.controls.partTimePercentage.reset();
    } else {
      this.signUpForm.controls.partTimePercentage.setValidators(
        percentValidator()
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
    const response = await this.loginService.registerUser(form);
    if (response.status === 200) {
      this.closeModal();
      return;
    }
    this.error = true;
  }
}

export function percentValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value < 10 || control.value > 90) {
      return { error: 'Number has to be between 10 and 90' };
    }
    return null;
  };
}
