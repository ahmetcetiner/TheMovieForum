import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';

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
  movieTitle !: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getMovieById(params["movieId"]);
    });
  }

  getMovieById(movieId) {
    this.movieService.getMovieById(movieId).subscribe((data) => {
      this.movie = data;
      this.movieTitle=data.title;
    });
  }

}
