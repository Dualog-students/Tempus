import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  FormGroup,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { HoursService } from '../../../services/hours.service';
import { UserProviderService } from '../../../services/api/user-provider.service';

import { User } from 'src/app/models/user.model';
import { Hours } from 'src/app/models/hours.model';

@Component({
  selector: 'app-register-hours-modal',
  templateUrl: './register-hours-modal.component.html',
  styleUrls: ['./register-hours-modal.component.scss'],
})
export class RegisterHoursComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private hoursService: HoursService,
    private userProviderService: UserProviderService,
  ) {}

  @Input() date: Date;
  @Input() edit: boolean;
  @Input() modal: boolean;
  @Input() project: Hours;
  @Output() refreshUser = new EventEmitter();
  @Output() modalChange = new EventEmitter<boolean>();
  registerTypeText: string;

  user: User;
  hoursKey: string;
  hoursRegisterForm = this.fb.group(
    {
      date: [, Validators.required],
      hours: [, [Validators.required, Validators.min(1), Validators.max(24)]],
      project: ['', Validators.required],
    },
    { validators: (c) => this.validateChange(c) },
  );

  displayInfoMessage: boolean;
  infoMessage = 'No change in registered data';

  // TODO: Replace with data from DB
  projectOptions = ['Tempus', 'Summer Internship', 'Ship GUI'].map((x) => {
    return { name: x };
  });

  ngOnInit(): void {
    this.registerTypeText = this.edit ? 'Edit' : 'Register';
    this.hoursKey = this.findHoursKey(this.date);
    this.getUserData();
  }

  zeroPad(n: number): string {
    return (n < 10 ? '0' + n : n).toString();
  }

  // Updates the hourkey to the selected date zero-padded
  findHoursKey(date: Date): string {
    const day = this.zeroPad(date.getDate());
    const month = this.zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Get the user data and update the form
  getUserData() {
    this.userService.getCurrentUser().then((resp) => {
      this.user = resp;
      this.updateForm();
    });
  }

  onSubmit(): void {
    if (this.hoursRegisterForm.valid) {
      const id = this.user._id;
      const hours = this.hoursRegisterForm.value;

      // Project sent to DB should only be the name of the project
      hours.project = hours.project.name;

      console.log(this.user.Hours);
      const existingHours = this.user.Hours;
      if (hours.project in existingHours) {
        if (this.hoursKey in existingHours[hours.project]) {
          if (
            hours.hours === existingHours[hours.project][this.hoursKey].Hours
          ) {
            this.displayInfoMessage = true;
            this.infoMessage = 'This entry already exist';
          }
        }
      }

      if (this.project && hours.project !== this.project.Project) {
        const oldForm: Hours = {
          Date: this.date.getTime(),
          Hours: this.project.Hours,
          Project: this.project.Project,
        };
        this.userProviderService.deleteHours(id, oldForm);
        this.insertHours(id, hours);
      } else {
        this.insertHours(id, hours);
      }
    }
  }

  insertHours(id: string, hours: Hours) {
    this.hoursService.registerHours(id, hours).then((resp) => {
      if (resp) {
        this.closeModal();
        // location.reload();
      } else {
        alert('Hour registration failed');
      }
    });
  }

  updateForm() {
    if (this.project) {
      this.hoursRegisterForm.patchValue({
        date: this.date.getTime(),
        hours: this.project.Hours,
        project: { name: this.project.Project },
      });
    } else {
      // no existing project use default values
      this.hoursRegisterForm.patchValue({
        date: this.date.getTime(),
        hours: 8,
        project: { name: this.projectOptions[0].name },
      });
    }
  }

  private validateChange(c: AbstractControl) {
    if (c.value.date) {
      // Only run when the form has a date
      const existingHours = this.user.Hours;
      if (c.value.project.name in existingHours) {
        // The user has registered hours on project before
        if (this.hoursKey in existingHours[c.value.project.name]) {
          // The user has hours on this date on the project
          this.displayInfoMessage = true;
          if (
            c.value.hours ===
            existingHours[c.value.project.name][this.hoursKey].Hours
          ) {
            // These hours already exist for the project on this date
            this.infoMessage = 'These hours have already been registered';
            return { entryExists: true };
          } else if (!this.edit) {
            // Tryin to add new hours to existing project on this date
            this.infoMessage = `There are already registered hours on ${c.value.project.name} for ${this.hoursKey}`;
            return { entryExists: true };
          }
        }
      }
    }

    this.displayInfoMessage = false;
  }

  closeModal() {
    this.infoMessage = '';
    this.displayInfoMessage = false;
    this.modal = false;
    this.modalChange.emit(this.modal);
    this.refreshUser.emit();
  }
}
