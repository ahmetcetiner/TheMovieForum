import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import {
  IMAGE_BASE_URL, POSTER_SIZE
} from 'src/config';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'],
  providers:[MovieService]
})
export class MovieInfoComponent implements OnInit {

  constructor(private movieService:MovieService,
    private activatedRoute:ActivatedRoute) { }

  @Input() movie : Movie  = new Movie();
  @Input() imageUrl : ""
  @Input() backdropImageUrl : ""

  imagePath :string ;
 
 ngOnInit() {
   // this.imagePath = this.setImagePath(this.movie);
   this.movieService.getMovieById(this.movie.id.toString()).subscribe(data=>{
     this.imagePath=data.poster_path
   })
   console.log(this.movie)
  }
  

  /*setImagePath(movie:Movie){
    return IMAGE_BASE_URL+POSTER_SIZE+movie.poster_path;

  }*/
}
