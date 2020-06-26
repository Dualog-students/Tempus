import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../../services/user.service';

import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register-hours',
  templateUrl: './register-hours.component.html',
  styleUrls: ['./register-hours.component.scss'],
})
export class RegisterHoursComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService) {}

  user: User;
  hoursKey: string;
  // Initial selected date is today
  selectedDate = new Date();
  loginForm = this.fb.group({
    date: [this.selectedDate.getTime()],
    hours: [0],
    project: [''],
  });

  jsonString: string;

  ngOnInit(): void {
    console.log(this.userService.isLoggedIn);
    this.updateHoursKey();
    this.getUserData();
  }

  updateHoursKey(): void {
    const day = this.selectedDate.getDate();
    const month = this.selectedDate.getUTCMonth() + 1;
    const year = this.selectedDate.getFullYear();
    this.hoursKey = `${day}/${month}/${year}`;
  }

  updateDate(date: Date): void {
    this.selectedDate = date;
    this.loginForm.patchValue({
      date: this.selectedDate.getTime(),
    });
    this.updateHoursKey();
  }

  getUserData() {
    this.userService.getCurrentUser().then((resp) => {
      this.user = resp;
    });
  }

  onSubmit(): void {
    console.warn(this.loginForm.value);
    this.jsonString = JSON.stringify(this.loginForm.value);
  }

  loghours(): void {
    /* console.warn(this.user['Hours']); */
    console.log(this.hoursKey);
    // TODO: figure out what broke user.hours...
    /* console.log(this.user.Hours[this.updateHoursKey]); */
  }
}
