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
  backdropImageUrl: string;
  reviewInput: boolean;
  reviewText: Text;
  reviewTitle: string;

  @Input() set movieId(id) {
    this.myMovieId = id;
  }
  reviews: Array<Review> = new Array<Review>();
  ngOnInit(): void {
    this.movieService.getMovieById(this.myMovieId.toString()).subscribe(data => {
      this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path
    })
    this.getComments()
    this.getReviewArea(this.reviewInput)
  }

  getComments() {
    
  }
  getReviewArea(reviewInput: boolean) {
    this.reviewInput = reviewInput;
  }
  reviewAdd() {
    alert(this.reviewText+this.reviewTitle);
  }

}
