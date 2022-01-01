import { Actor } from './../../model/actor';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from 'src/config';
import { Crew } from 'src/app/model/crew';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers: [MovieService],
})
export class MovieInfoComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  
  imagePath: string;
  imageUrl: string;
  movie!: Movie;
  backdropImageUrl: string;

  @Input() set submittedMovie(movie: Movie) {
    this.movie = movie;
    this.imagePath =        IMAGE_BASE_URL + BACKDROP_SIZE + movie.poster_path;
    this.imageUrl =         IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path;
    this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + movie.poster_path;
  }

  actors : Actor[]
  directors : Crew[]

  sendModule: string = "actor";

  ngOnInit() {
     this.movieService.getActorsByMovieId(this.movie.id.toString()).subscribe((data) => {
       this.actors=data.cast
       this.directors= data.crew.filter(member => member.job=="Director");
     })
     
  }

  getModule(moduleName) {
    switch (moduleName) {
      case 'actor':
        this.sendModule = 'actor';
        break;
      case 'reviews':
        this.sendModule = 'reviews';
        break;
      case 'discussions':
        this.sendModule = 'discussions';
        break;
      default:
        this.sendModule = 'actor';
        break;
    }
  }

  get
}
