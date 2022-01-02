import { Actor } from './../../model/actor';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from 'src/config';
import { Crew } from 'src/app/model/crew';
import { DatePipe } from '@angular/common';

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
  runtime : string;
  revenue : string;
  budget : string;

  datepipe :DatePipe= new DatePipe('en-US')  
  release_date:string;

  @Input() set submittedMovie(movie: Movie) {
    this.movie = movie;
    this.imagePath =        IMAGE_BASE_URL + BACKDROP_SIZE + movie.poster_path;
    this.imageUrl =         IMAGE_BASE_URL + BACKDROP_SIZE + movie.backdrop_path;
    this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + movie.poster_path;
    this.release_date = this.datepipe.transform(movie.release_date, 'dd/MM/yyyy')
  }

  actors : Actor[]
  directors : Crew[]

  sendModule: string = "actor";

  ngOnInit() {
     this.movieService.getActorsByMovieId(this.movie.id.toString()).subscribe((data) => {
       this.actors=data.cast
       this.directors= data.crew.filter(member => member.job=="Director");
     })
     this.runtime = this.calcTime(this.movie.runtime)
     this.revenue = this.calcTime(this.movie.revenue)
     this.budget = this.calcTime(this.movie.budget)
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

  // Convert time to hours and minutes
  calcTime(time){
  let hours = Math.floor(time / 60);
  let mins = time % 60;
  return `${hours}h ${mins}m`;
};
  // Convert a number to money formatting
  convertMoney(money){
  let formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};
}
