import { Component, OnInit, Input, Injectable, Output, EventEmitter, ElementRef } from '@angular/core';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
@Injectable()
export class TableComponent implements OnInit {

  flag = false;

  @Input() comments: Comment[];

  @Output() commentSelectEvent = new EventEmitter<Comment>();

  @Input() selectedComment: Comment;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    console.log(this);
  }

  selectComment(comment: Comment) {
    console.log(arguments);
    this.selectedComment = comment;
    this.commentSelectEvent.emit(comment);

    this.flag = true;
  }
}
