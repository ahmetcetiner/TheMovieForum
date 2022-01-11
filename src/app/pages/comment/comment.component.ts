import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { idGetter } from 'src/app/app.module';
import { Review } from 'src/app/model/review';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private formBuilder: FormBuilder
  ) { }

  datePipe: DatePipe = new DatePipe('en-US');

  myMovieId: number;
  reviewInput: boolean;
  reviewText: string;
  reviewTitle: string;

  commentForm: FormGroup;
  review: Review = new Review();

  @Input() set movieId(id) {
    this.myMovieId = id;
  }

  ngOnInit(): void {
    this.createCommentForm();
  }
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      Title: ['', Validators.required],
      Text: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  getReviewArea(reviewInput: boolean) {
    this.reviewInput = reviewInput;

  }

  setModel() {
    this.review.UserId = Number(idGetter());
    this.review.MovieId = this.myMovieId;
    this.review.MessageText = this.commentForm.controls['Text'].value;
    this.review.Title = this.commentForm.controls['Title'].value;

    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
    this.review.CreatedDate = date;
  }

  comment() {
    if (this.commentForm.valid) {
      this.setModel();
      this.reviewService.addReview(this.review);
    }
    setTimeout(() => {
      window.location.reload()
    }, 300)
  }
}

