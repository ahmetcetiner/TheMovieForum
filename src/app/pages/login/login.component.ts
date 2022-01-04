import { getTestBed } from '@angular/core/testing';
import { AuthService } from './../../services/auth.service';
import { LoginUser } from './../../model/loginUser';
import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt'
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL
} from 'src/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private movieService:MovieService, private authService: AuthService,private jwtHelper: JwtHelperService) { }

  model: LoginUser = new LoginUser();
  imagePath:string;
  resultIndex : number = Math.floor(Math.random() * 20);

   ngOnInit() {    
      this.movieService.getBackdropImage().subscribe(data=>{     
      this.imagePath= IMAGE_BASE_URL+BACKDROP_SIZE+data.results[this.resultIndex].backdrop_path      
    })   
  }
  login(){
    this.authService.login(this.model)
  }
 

  get isAuthenticated(){
     return this.authService.loggedIn();
  }

}
