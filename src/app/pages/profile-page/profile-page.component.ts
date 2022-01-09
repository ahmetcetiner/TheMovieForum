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

  sendModule: string = 'Favory List';
  listId: string = '1'
 
  list: List[]
  movies:Array<Movie>=Array<Movie>()

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private listService: ListService,
    private movieService: MovieService) { }

  user: User
  userId = idGetter()

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getUser(params['userId']);
     // this.userId = params['userId']
    });
  }

  getUser(userId) {
    this.userService.getUserById(userId).subscribe(data => {
      this.user = data[0],
      console.log(data)
    })
  }

  getModule(moduleName) {
    switch (moduleName) {
      case 'Favory List':
        this.sendModule = 'Favory List';
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
        this.sendModule = 'Favory List';
        this.listId = '1'
        break;
    }
    this.getList()
  }
  getList() {
    this.listService.getListByUserAndTypeId(this.userId, this.listId).subscribe(data => {
      this.getMovies(data)
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

}
