import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {

  
  constructor(private movieService : MovieService) { }
  movieTitle : string


   async ngOnInit() {
    this.movieService.getMovieById("634649").subscribe(data => {
       this.movieTitle=data.title
       
    })
  }

}
