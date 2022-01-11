import { AuthService } from './../../services/auth-service/auth.service';
import { UserService } from './../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import { Review } from 'src/app/model/review';
import { MovieService } from '../../services/movie-service/movie.service';
import { ReviewService } from '../../services/review-service/review.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private reviewService: ReviewService,
    private movieService: MovieService,
    private authService: AuthService
  ) {}

  backdropImageUrl: string;
  reviews: Review[];
 
  imageUrls: Array<string> = new Array<string>();
  datepipe: DatePipe = new DatePipe('en-US');
  release_dates: Array<string> = new Array<string>();

  numberDizi: Array<number> = new Array<number>();

  ngOnInit() {
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getReviews().subscribe((data) => {
      this.reviews = data;
      this.getDates(data);
      this.getMovieImage(data);
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
  getMovieImage(data) {
    data.map((review) => {
      this.movieService
        .getMovieById(review.MovieId.toString())
        .subscribe((data) => {
          this.imageUrls.push(
            IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path
          );
        });
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
}
