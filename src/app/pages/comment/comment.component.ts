import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor( private movieService:MovieService) { }

  myMovieId : number;
  backdropImageUrl : string

  @Input() set movieId(id){
    this.myMovieId=id;
  }
  
  ngOnInit(): void {
    this.movieService.getMovieById(this.myMovieId.toString()).subscribe(data => {
      this.backdropImageUrl=IMAGE_BASE_URL+BACKDROP_SIZE+data.backdrop_path
    })
  }

}
