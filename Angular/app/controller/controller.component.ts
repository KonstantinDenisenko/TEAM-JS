import { Component, OnInit, Injectable } from '@angular/core';
import { Comment } from '../models/comment';

import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css'],
  providers: [CommentsService]
})
@Injectable()
export class ControllerComponent implements OnInit {

  filteredComment: Comment[];
  selectedComment: Comment;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.commentsService.getComments()
      .subscribe((comments: Comment[]) => {
        this.filteredComment = comments;
      });
  }

  onCommentSelect(comment: Comment) {
    console.log(comment.body);
    this.selectedComment = comment;
  }

  unselectComment() {
    this.selectedComment = null;
  }

  onSearch(value: string) {
    this.filteredComment = this.commentsService.filterComments(value);
  }

  onSomeEvent() {
    console.log('someEvent called');
  }
}
