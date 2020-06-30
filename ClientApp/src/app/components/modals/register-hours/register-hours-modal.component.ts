import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router,
  ) {}

  @Input() date = new Date();
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();

  user: User;
  hoursKey: string;
  hoursRegisterForm = this.fb.group({
    date: [this.date.getTime()],
    hours: [, Validators.required],
    project: ['', Validators.required],
  });

  // TODO: Replace with data from DB
  projectOptions = ['Tempus', 'Summer Internship', 'Ship GUI'].map((x) => {
    return { name: x };
  });

  ngOnInit(): void {
    this.updateHoursKey();
    this.getUserData();
  }

  zeroPad(n: number): string {
    return (n < 10 ? '0' + n : n).toString();
  }

  // Updates the hourkey to the selected date zero-padded
  updateHoursKey(): void {
    const day = this.zeroPad(this.date.getDate());
    const month = this.zeroPad(this.date.getMonth() + 1);
    const year = this.date.getFullYear();
    this.hoursKey = `${day}/${month}/${year}`;
  }

  updateDate(date: Date): void {
    this.date = date;
    this.updateHoursKey();
    this.updateForm();

    // Update the date in the form to UTC of date
    this.hoursRegisterForm.patchValue({
      date: date.getTime(),
    });
  }

  // Get the user data and update the form
  getUserData() {
    this.userService.getCurrentUser().then((resp) => {
      this.user = resp;
      this.updateForm();
      // console.log(this.user.Hours[this.hoursKey]);
    });
  }

  onSubmit(): void {
    // Change the project field to only contain the project name
    this.hoursRegisterForm.patchValue({
      project: this.hoursRegisterForm.get('project').value.name,
    });
    const hours: Hours = this.hoursRegisterForm.value;
    const id = this.user._id;
    this.hoursService.registerHours(id, hours).then((resp) => {
      if (resp) {
        this.closeModal();
        /* console.log(this.hoursRegisterForm.value); */
        /* location.reload(); */
        /* this.router.navigate(['/']); */
      } else {
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

    // Patch the form hours and project values to the values from the database
    this.hoursRegisterForm.patchValue({
      hours: this.getHoursObject().Hours,
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
