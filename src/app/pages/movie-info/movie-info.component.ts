import { Actor } from './../../model/actor';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from 'src/config';
import { Crew } from 'src/app/model/crew';
import { DatePipe } from '@angular/common';
import { List } from 'src/app/model/list';
import { idGetter } from 'src/app/app.module';
import { ListService } from 'src/app/services/list-service/list.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers: [MovieService],
})
export class MovieInfoComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private listService: ListService
  ) {}

  imageUrl: string;
  backdropImageUrl: string;
  runtime: string;
  revenue: string;
  budget: string;
  movieId: number;
  list: List;
  userId: number = Number(idGetter());

  isFavorite: boolean = false;
  isWatch: boolean = false;
  isWatched: boolean = false;

  datepipe: DatePipe = new DatePipe('en-US');
  release_date: string;

  actors: Actor[];
  directors: Crew[];

  sendModule: string = 'actor';

  movie!: Movie;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.getMovieById(params['movieId']);
      this.getActorsById(params['movieId']);
      this.movieId = params['movieId'];
      this.checkFavoriteList(params['movieId']);
      this.checWatchList(params['movieId']);
      this.checWatchedList(params['movieId']);
    });

    this.runtime = this.calcTime(this.movie.runtime);
    this.revenue = this.calcTime(this.movie.revenue);
    this.budget = this.calcTime(this.movie.budget);
  }

  getActorsById(movieId) {
    this.movieService
      .getActorsByMovieId(movieId.toString())
      .subscribe((data) => {
        this.actors = data.cast;
        this.directors = data.crew.filter((member) => member.job == 'Director');
      });
  }

  getMovieById(movieId) {
    this.movieService.getMovieById(movieId).subscribe((data) => {
      this.movie = data;
      this.movieId = data.id;
      this.imageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path;
      this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + data.poster_path;
      this.release_date = this.datepipe.transform(
        data.release_date,
        'dd/MM/yyyy'
      );
    });
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

  listAdd(type: number) {
    this.list = new List(type, this.userId, this.movieId);
    this.listService.addListItem(this.list);
  }

  deleteList(type: number){
    this.list = new List(type, this.userId, this.movieId);
    this.listService.deleteListItem(this.list);
    console.log(this.list)
  }

  checkFavoriteList(movieId) {
    this.listService
      .checkMoviOnList(this.userId, 1, movieId)
      .subscribe((data) => {
        this.isFavorite = data.isExist;
      });
  }

  checWatchList(movieId) {
    this.listService
      .checkMoviOnList(this.userId, 3, movieId)
      .subscribe((data) => {
        this.isWatch = data.isExist;
      });
  }

  checWatchedList(movieId) {
    this.listService
      .checkMoviOnList(this.userId, 2, movieId)
      .subscribe((data) => {
        this.isWatched = data.isExist;
      });
  }

  // Convert time to hours and minutes
  calcTime(time) {
    let hours = Math.floor(time / 60);
    let mins = time % 60;
    return `${hours}h ${mins}m`;
  }

  // Convert a number to money formatting
  convertMoney(money) {
    let formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    });
    return formatter.format(money);
  }
}
