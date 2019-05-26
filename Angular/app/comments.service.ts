import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from './models/comment';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  comments: Comment[];

  constructor(private http: HttpClient) { }

  getComments() {
    if (this.comments) {
      return of(this.comments);
    }

    return this.http.get("https://jsonplaceholder.typicode.com/comments")
      .pipe(
        map((data: Comment[]) => {
          this.comments = data;

          return data;
        })
      );
  }

  filterComments(value: string) {
    if (!value) {
      this.comments;
    }

    return this.comments.filter(comment => {
      return comment.id.toString().includes(value)
        || comment.postId.toString().includes(value)
        || comment.name.toString().toLowerCase().includes(value)
        || comment.email.toString().toLowerCase().includes(value);
    });
  }
}
