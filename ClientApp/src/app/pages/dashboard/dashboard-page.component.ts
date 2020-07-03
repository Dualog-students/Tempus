import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  AfterContentChecked,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { GridLoggerComponent } from '../../components/grid-logger/grid-logger.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dashboard',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardComponent implements OnInit, AfterContentChecked {
  @ViewChild('gridLogger') gridLogger: GridLoggerComponent;
  user: User;
  @Input() numDays: number;
  @Input() currentDate?: number;
  @Input() selectedDate?: number;

  modal = false;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    this.numDays = 7;
    this.user = await this.userService.getCurrentUser();
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  refreshUserChild() {
    this.gridLogger?.refreshUser();
  }
}
