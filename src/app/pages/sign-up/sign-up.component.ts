import { Component, OnInit } from '@angular/core';
import { PopularMovie } from 'src/app/model/popularMovie';
import { MovieService } from 'src/app/services/movie.service';
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL
} from 'src/config';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private movieService:MovieService) { }

  movies : PopularMovie
  imagePath:string;
  resultIndex : number = Math.floor(Math.random() * 20);

  ngOnInit(){
    this.movieService.getBackdropImage().subscribe(data=>{
      this.movies=  data;       
      this.imagePath= IMAGE_BASE_URL+BACKDROP_SIZE+data.results[this.resultIndex].backdrop_path      
    })   
  }

}
