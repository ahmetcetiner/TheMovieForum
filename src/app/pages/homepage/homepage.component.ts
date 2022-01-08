import { AuthService } from './../../services/auth-service/auth.service';
import { UserService } from './../../services/user-service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';
import { idGetter } from 'src/app/app.module';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import { Review } from 'src/app/model/review';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
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
    private userService: UserService,
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
      console.log(data);
      this.getDates(data);
      this.getMovieImage(data);
    });
  }

  getDates(data) {
    console.log(data);
    data.map((review) => {
      let release_date = this.datepipe.transform(
        review.CreatedDate,
        'dd/MM/yyyy'
      );
      this.release_dates.push(release_date);
    });
  }
  getMovieImage(data) {
    console.log(data);
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
