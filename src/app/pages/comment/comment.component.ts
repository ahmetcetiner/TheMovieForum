import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/model/review';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private reviewService: ReviewService
    ) { }

  myMovieId: number;
  reviewInput: boolean;
  reviewText: Text;
  reviewTitle: string;

  @Input() set movieId(id) {
    this.myMovieId = id;
  }
  
  ngOnInit(): void {

    this.getReviewArea(this.reviewInput)
  }

  getReviewArea(reviewInput: boolean) {
    this.reviewInput = reviewInput;
  }
  reviewAdd() {
   //this.reviewService.addReview()
  }

}
