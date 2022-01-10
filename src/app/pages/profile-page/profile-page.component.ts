import { map } from 'rxjs/operators';
import { Genre } from './../../model/genre';
import { idGetter } from 'src/app/app.module';
import { User } from './../../model/users';
import { UserService } from './../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/services/list-service/list.service';
import { List } from 'src/app/model/list';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Movie } from 'src/app/model/movie';
import { SyncAsync } from '@angular/compiler/src/util';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  sendModule: string = 'Favorite List';
  listId: string = '1'
 
  list: List[]
  favoriteList : Array<number>= new Array<number>()
  genres : Array<Genre>= new Array<Genre>()
  movies:Array<Movie> =new Array<Movie>()
  genreNames : Array<string>= new Array<string>()

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private listService: ListService,
    private movieService: MovieService) { }

  user: User
  userId = idGetter()

  ngOnInit(): void {
    this.getModule("Favorite List")
    this.getUser()
  }

  getUser() {
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data[0]
    })
  }

  getModule(moduleName) {
    switch (moduleName) {
      case 'Favorite List':
        this.sendModule = 'Favorite List';
        this.listId = '1'
        break;
      case 'Watch List':
        this.sendModule = 'Watch List';
        this.listId = '2'
        break;
      case 'Watched List':
        this.sendModule = 'Watched List';
        this.listId = '3'
        break;
      default:
        this.sendModule = 'Favorite List';
        this.listId = '1'
        break;
    }
    this.getList()
  }
  getList() {
    this.listService.getListByUserAndTypeId(this.userId, this.listId).subscribe(data => {
      this.getMovies(data)    
      this.setListItem(data)
    })
  }

  getMovies(data) {
    while (this.movies.length) {
      this.movies.pop();
    }
    data.map(movie => {
      this.movieService.getMovieById(movie.MovieId.toString()).subscribe(data => {
        this.movies.push(data)
      })
    }) 
  }

  setListItem(data){
    data.map(movie=>{
      this.favoriteList.push(movie.MovieId)
    })
    
    this.favoriteList.map(movieId => {
      this.movieService.getMovieById(movieId.toString()).subscribe(data=>{
         this.getGenres(data.genres)
      })
    })        
    
  }

  getGenres(genres){
    genres.map(genre=>{
      this.genreNames.push(genre.name);
    })  
    this.genreNames = [...new Set(this.genreNames)];   
  }

}
