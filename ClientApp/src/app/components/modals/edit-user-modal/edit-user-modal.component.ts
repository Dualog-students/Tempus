import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { UserProviderService } from '../../../services/api/user-provider.service';
import {
  passwordValidator,
  confirmPasswordValidator,
} from '../../../validators/password.validator';
import { partTimePercentValidator } from '../../../validators/part-time-percentage.validator';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();
  _field: string;
  user: User;

  fgUpdateUserField = new FormGroup({
    field: new FormControl('', [Validators.required]),
    value: new FormControl(''),
  });
  fgChangePassword = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  constructor(
    private userService: UserService,
    private userProvider: UserProviderService,
  ) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
    this.fgChangePassword.controls.password.setValidators([
      Validators.required,
      passwordValidator(this.fgChangePassword.controls.password),
    ]);
    this.fgChangePassword.controls.confirmPassword.setValidators([
      Validators.required,
      confirmPasswordValidator(
        this.fgChangePassword.controls.confirmPassword,
        this.fgChangePassword.controls.password,
      ),
    ]);
  }

  @Input()
  set field(field: string) {
    if (field === 'PartTimePercentage') {
      this.fgUpdateUserField.controls.value.setValidators([
        Validators.required,
        partTimePercentValidator(this.fgUpdateUserField.controls.value),
      ]);
    } else if (field === 'Email') {
      this.fgUpdateUserField.controls.value.setValidators([
        Validators.email,
        Validators.required,
      ]);
    } else {
      this.fgUpdateUserField.controls.value.setValidators([
        Validators.required,
      ]);
    }
    this._field = field;
  }

  closeModal() {
    this.fgUpdateUserField.reset();
    this.fgChangePassword.reset();
    this.modal = false;
    this.modalChange.emit(this.modal);
  }

  async saveModal() {
    let fg, field, value;
    if (this._field === 'Password') {
      fg = this.fgChangePassword;
      field = fg.controls.password;
      value = fg.controls.changePassword;
    } else {
      fg = this.fgUpdateUserField;
      fg.controls.field.setValue(this._field);
      field = fg.controls.field;
      value = fg.controls.value;
    }
    if (!fg.valid) {
      fg.markAllAsTouched();
      return;
    }
    await this.userProvider.updateUserField(
      this.user._id,
      field.value,
      value.value,
    );
    this.closeModal();
    location.reload();
  }
}
