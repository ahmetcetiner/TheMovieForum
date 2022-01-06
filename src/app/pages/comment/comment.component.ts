import {  DatePipe, formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { idGetter } from 'src/app/app.module';
import { Review } from 'src/app/model/review';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private reviewService: ReviewService
    ) { }

    datePipe :  DatePipe = new DatePipe('en-US');

  myMovieId: number;
  reviewInput: boolean;
  reviewText: string;
  reviewTitle: string;

  model : Review = new Review
  @Input() set movieId(id) {
    this.myMovieId = id;
  }
  
  ngOnInit(): void {
    this.getReviewArea(this.reviewInput)
  }

  getReviewArea(reviewInput: boolean) {
    this.reviewInput = reviewInput;
  }

  setModel(){
    this.model.UserId=parseInt(idGetter())
    this.model.MovieId=this.myMovieId;
    this.model.ReviewLike=0
    this.model.ReviewDislike=0
    this.model.MessageText=this.reviewText
    this.model.Title=this.reviewTitle    
   
    let d = new Date()
    let date= this.datePipe.transform(new Date(),'yyyy-MM-dd')
    this.model.CreatedDate= date
    console.log()

  }
  reviewAdd() {
    this.setModel()
    console.log(this.model)
    this.reviewService.addReview(this.model).subscribe(data=>{})
  }

}
