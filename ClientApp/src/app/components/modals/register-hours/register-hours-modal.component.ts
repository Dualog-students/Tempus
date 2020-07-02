import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
  @Output() modalChange = new EventEmitter<boolean>();
  registerTypeText: string;

  user: User;
  hoursKey: string;
  hoursRegisterForm = this.fb.group({
    date: [, Validators.required],
    hours: [, [Validators.required, Validators.min(1), Validators.max(24)]],
    project: ['', Validators.required],
  });

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
    const id = this.user._id;
    const hours = this.hoursRegisterForm.value;

    // Project sent to DB should only be the name of the project
    hours.project = hours.project.name;

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

  insertHours(id, hours) {
    this.hoursService.registerHours(id, hours).then((resp) => {
      if (resp) {
        this.closeModal();
        location.reload();
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

  closeModal() {
    this.modal = false;
    this.modalChange.emit(this.modal);
  }
}
