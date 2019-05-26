import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  someValue = 'value from component';

  @Output() closeEvent = new EventEmitter();

  @Input() comment: Comment;

  constructor() { }

  ngOnInit() {
    console.log(this.comment);
  }

  close() {
    this.comment = null;
    this.closeEvent.emit();
  }

  onSomeEvent() {
    console.log('someEvent called');
  }
}
