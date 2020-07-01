import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { UserService } from '../../../services/user.service';
import { HoursService } from '../../../services/hours.service';

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
  ) {}

  @Input() date: Date;
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();

  user: User;
  hoursKey: string;
  hoursRegisterForm = this.fb.group({
    date: [, Validators.required],
    hours: [, [Validators.required, Validators.min(0), Validators.max(24)]],
    project: ['', Validators.required],
  });

  infoMessage = 'No change in registered data';
  submitDisable = !this.hoursRegisterForm.valid;

  // TODO: Replace with data from DB
  projectOptions = ['Tempus', 'Summer Internship', 'Ship GUI'].map((x) => {
    return { name: x };
  });

  ngOnInit(): void {
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
    const id = this.user._id;
    const hours = this.hoursRegisterForm.value;

    // Project sent to DB should only be the name of the project
    hours.project = hours.project.name;

    // Only register in DB if hours and project has changed
    this.hoursService.registerHours(id, hours).then((resp) => {
      if (resp) {
        this.closeModal();
        location.reload();
      } else {
        this.infoMessage = 'Hour registration failed';
      }
    });
  }

  updateForm() {
    // Find the project in the hours object
    let project: {} = this.getHoursObject().Project;
    if (project === null || project === undefined) {
      // The hour object didn't have a project field, so use first value in project dropdown
      project = this.projectOptions[0].name;
    }

    let hours: {} = this.getHoursObject().Hours;
    if (hours === null || hours === undefined) {
      // Set hours to zero if not found in DB
      hours = 0;
    }

    // Update the fields in the form
    this.hoursRegisterForm.patchValue({
      date: this.date.getTime(),
      hours: hours,
      project: { name: project },
    });
  }

  // Return the wanted hours object from the database or an empty object
  getHoursObject(): Hours {
    return this.user.Hours[this.hoursKey] || {};
  }

  validHourValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value < 0 || control.value > 24) {
        return { error: 'Registered hours should be between 0 and 24' };
      }
      return null;
    };
  }

  closeModal() {
    this.modal = false;
    this.modalChange.emit(this.modal);
  }
}
