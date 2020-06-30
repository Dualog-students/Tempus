import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

import { UserService } from '../../services/user.service';
import { HoursService } from '../../services/hours.service';

import { User } from 'src/app/models/user.model';
import { Hours } from 'src/app/models/hours.model';

@Component({
  selector: 'app-register-hours',
  templateUrl: './register-hours.component.html',
  styleUrls: ['./register-hours.component.scss'],
})
export class RegisterHoursComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private hoursService: HoursService,
    private router: Router,
  ) {}

  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();

  // TODO: Replace with date from dashboard that created modal
  selectedDate = new Date();

  user: User;
  hoursKey: string;
  hoursRegisterForm = this.fb.group({
    date: [this.selectedDate.getTime()],
    hours: [, Validators.required],
    project: ['', Validators.required],
  });

  // TODO: Replace with data from DB
  options = ['Tempus', 'Summer Internship', 'Ship GUI'].map((x) => {
    return { name: x };
  });

  selectedProject = this.options[0];

  jsonString: string;

  ngOnInit(): void {
    this.updateHoursKey();
    this.getUserData();
  }

  zeroPad(n: number): string {
    return (n < 10 ? '0' + n : n).toString();
  }

  updateHoursKey(): void {
    // Updates the hourkey to the selected date zero-padded
    const day = this.zeroPad(this.selectedDate.getDate());
    const month = this.zeroPad(this.selectedDate.getMonth() + 1);
    const year = this.selectedDate.getFullYear();
    this.hoursKey = `${day}/${month}/${year}`;
  }

  updateDate(date: Date): void {
    this.selectedDate = date;
    this.updateHoursKey();
    this.getUserData();
  }

  getUserData() {
    // Get the user data and update the form
    this.userService.getCurrentUser().then((resp) => {
      this.user = resp;
      this.updateForm();
    });
  }

  onSubmit(): void {
    // Change the project field to only contain the project name
    this.hoursRegisterForm.patchValue({
      project: this.hoursRegisterForm.get('project').value.name,
    });
    this.jsonString = JSON.stringify(this.hoursRegisterForm.value);
    const hours: Hours = this.hoursRegisterForm.value;
    const id = this.user._id;
    this.hoursService.registerHours(id, hours).then((resp) => {
      if (resp) {
        location.reload();
        this.router.navigate(['/']);
      }
    });
  }

  updateForm() {
    let project: {} = this.getHoursObject().Project;
    if (project === null || project === undefined) {
      // No project found, use first project in dropdown
      project = this.options[0].name;
    }
    // Patch the form hours and project values to the values from the database
    this.hoursRegisterForm.patchValue({
      hours: this.getHoursObject().Hours,
      project: { name: project },
    });
    /* this.hoursDayForm.controls.project.setValidators(this.validHourValidator()); */
  }

  getHoursObject(): Hours {
    // Return the wanted hours object from the database or an empty object
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
