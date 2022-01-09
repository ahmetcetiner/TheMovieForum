import { idGetter } from 'src/app/app.module';
import { UserService } from '../../../services/user-service/user.service';
import { AuthService } from '../../../services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Movie } from 'src/app/model/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-banner',
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.scss'],
})
export class ClientBannerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router:Router
  ) {}
  userId : string
  searchText:string;

  ngOnInit(): void {

    this.setUserId()
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
  logOut() {
    this.authService.logOut();
  }
  getSearch(){
    if(this.searchText!=""){
      this.router.navigate(['search/'+this.searchText])
    }
    else{
      this.router.navigate(['/'])
    }
  }

  setUserId(){
    this.userId=idGetter();
  }
}
