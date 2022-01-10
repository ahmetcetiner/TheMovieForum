import { map } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from '../../services/review-service/review.service';
import { Component, OnInit, Input } from '@angular/core';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from 'src/config';
import { Review } from 'src/app/model/review';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/model/users';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) {}

  myMovieId: number;
  backdropImageUrl: string;
  reviews: Review[];
  reviewId: number;
  users: Array<User> = new Array<User>();
  likeCount: Array<number> = new Array<number>();

  datepipe: DatePipe = new DatePipe('en-US');
  release_dates: Array<string> = new Array<string>();


  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getMovieImage(params['movieId']);
      this.getReview();
    });

  }

  getReview() {
    this.reviewService.getReviewByMovieId(this.myMovieId).subscribe((data) => {
      this.reviews = data;
      this.getDates(data);
    });
  }
  getDates(data) {
    data.map((review) => {
      let release_date = this.datepipe.transform(
        review.CreatedDate,
        'dd/MM/yyyy'
      );
      this.release_dates.push(release_date);
    });
  }

  getMovieImage(movieId: number) {
    this.movieService.getMovieById(movieId.toString()).subscribe((data) => {
      this.backdropImageUrl =
        IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path;
    });
  }
}
