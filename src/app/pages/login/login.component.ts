import { PopularMovie } from './../../model/popularMovie';
import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user-info';
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

  constructor(private movieService:MovieService) { }

  model: User = new User();
  movies : PopularMovie
  imagePath:string;
  resultIndex : number = Math.floor(Math.random() * 20);

   ngOnInit() {
      this.movieService.getBackdropImage().subscribe(data=>{
      this.movies=  data;       
      this.imagePath= IMAGE_BASE_URL+BACKDROP_SIZE+data.results[this.resultIndex].backdrop_path      
    })   
  
  }
  login(form:NgForm){
    alert(this.model.password+this.model.userName)
  }

}
