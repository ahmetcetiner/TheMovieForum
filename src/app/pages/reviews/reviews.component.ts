import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from './../../services/review.service';
import { Component, OnInit, Input } from '@angular/core';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from 'src/config';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewService:ReviewService,
      private movieService:MovieService) { }

  myMovieId : number;
  backdropImageUrl : string

  @Input() set movieId(id){
    this.myMovieId=id;
  }
  ngOnInit() {
   
  }

}
