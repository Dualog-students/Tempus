import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { UserProviderService } from '../../services/api/user-provider.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  @Input() modal: boolean;
  @Input() field: string;
  @Output() modalChange = new EventEmitter<boolean>();

  fgUpdateUserField = new FormGroup({
    field: new FormControl(this.field, [Validators.required]),
    value: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private userProvider: UserProviderService,
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.fgUpdateUserField.reset();
    this.modal = false;
    this.modalChange.emit(this.modal);
  }

  async saveModal() {
    if (!this.fgUpdateUserField.valid) {
      this.fgUpdateUserField.markAllAsTouched();
      return;
    }
    const user = await this.userService.getCurrentUser();
    await this.userProvider.updateUserField(
      user._id,
      this.fgUpdateUserField.controls.field.value,
      this.fgUpdateUserField.controls.value.value,
    );
    this.closeModal();
  }
}
