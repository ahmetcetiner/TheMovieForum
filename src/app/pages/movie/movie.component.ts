import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL, POSTER_SIZE
} from 'src/config';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
  providers: [MovieService],
})
export class MovieComponent implements OnInit {

  constructor( private movieService: MovieService,
    private activatedRoute: ActivatedRoute) { }

  movie !: Movie
  movieTitle : string;
  imageUrl : string
  backdropImageUrl : string

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getMovieById(params["movieId"]);
    });
  }

  getMovieById(movieId) {
    this.movieService.getMovieById(movieId).subscribe((data) => {
      this.movie = data;
      this.movieTitle=data.title;
      this.imageUrl = IMAGE_BASE_URL+BACKDROP_SIZE+data.backdrop_path;
      this.backdropImageUrl = IMAGE_BASE_URL+BACKDROP_SIZE+data.poster_path;

    });
  }

}
