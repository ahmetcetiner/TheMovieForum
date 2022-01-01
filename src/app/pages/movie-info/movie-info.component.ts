import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import {
  IMAGE_BASE_URL, POSTER_SIZE
} from 'src/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers:[MovieService]
})
export class MovieInfoComponent implements OnInit {

  constructor(private movieService:MovieService,
    private activatedRoute:ActivatedRoute,private router: Router) { }

  @Input() movie : Movie  = new Movie();
  @Input() imageUrl : ""
  @Input() backdropImageUrl : ""


  actorName : Array<string> = new Array<string>();
  character :  Array<string>= new Array<string>();
  actorImageUrl : Array<string>= new Array<string>();
  imagePath :string = this.movie.poster_path ;
 
  movies : Movie;

  sendModule : string 

 ngOnInit() {
   this.sendModule="actor";
   this.movieService.getMovieById(this.movie.id.toString()).subscribe(data=>{
     this.imagePath=data.poster_path
    this.movies = data
   
   })

   console.log(this.imagePath)
  }
  getModule (moduleName) {
    switch(moduleName){
      case "actor":
        this.sendModule="actor"
        break;
      case "reviews":
        this.sendModule="reviews"
        break;
      case "discussions":
        this.sendModule="discussions"
         break;
      default:
        this.sendModule="actor"
        break;
    }
};

}
