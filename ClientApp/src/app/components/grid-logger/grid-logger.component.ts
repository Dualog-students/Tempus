import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-grid-logger',
  templateUrl: './grid-logger.component.html',
  styleUrls: ['./grid-logger.component.scss'],
})
export class GridLoggerComponent implements OnInit {
  user: User;
  weekDays = [
    { name: 'Monday' },
    { name: 'Tuesday' },
    { name: 'Wednesday' },
    { name: 'Thursday' },
    { name: 'Friday' },
    { name: 'Saturday' },
    { name: 'Sunday' },
  ];
  @Input() numDays: number;
  @Input() date: Date;
  modalDate = new Date();
  modal = false;

  projects = [
    {
      name: 'project1',
      hours: 53,
    },
    {
      name: 'project2',
      hours: 65,
    },
    {
      name: 'project3',
      hours: 15,
    },
  ];

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.user = await this.userService.getCurrentUser();
  }

  zeroPad(n: number): string {
    return (n < 10 ? '0' + n : n).toString();
  }

  updateHoursKey(date): string {
    const day = this.zeroPad(date.getDate());
    const month = this.zeroPad(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  getHours(day, i) {
    const date = new Date();
    date.setDate(this.date.getDate() + i + 1 - this.date.getDay());
    let hour: any;
    const hours = [];
    Object.values(this.user.Hours).map((hour) => {
      if (this.updateHoursKey(date) === hour.Date) {
        hours.push(hour);
      }
    });
    return hours.length ? hours : null;
  }

  async onAdd(day, i) {
    this.modalDate = new Date();
    this.modalDate.setDate(this.date.getDate() + i + 1 - this.date.getDay());
    this.modal = true;
    this.user = await this.userService.getCurrentUser();
  }

  onEdit(day, i) {}
}
