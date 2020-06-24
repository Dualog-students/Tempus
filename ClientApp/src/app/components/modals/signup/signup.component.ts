import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  @Input() modal: boolean;
  @Output() modalChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    this.openModal();
  }

  openModal() {
    this.modal = true;
    this.modalChange.emit(this.modal);
    console.log('Opening modal');
  }

  closeModal() {
    this.modal = false;
    this.modalChange.emit(this.modal);
    console.log('Closing modal');
  }
}
