import { map } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from '../../services/review-service/review.service';
import { Component, OnInit, Input } from '@angular/core';
import { IMAGE_BASE_URL, BACKDROP_SIZE } from 'src/config';
import { Review } from 'src/app/model/review';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  constructor(private reviewService:ReviewService,
      private movieService:MovieService,
      private userService:UserService,) { }

  myMovieId : number;
  backdropImageUrl : string
  reviews : Review[]
  reviewId : number
  users : Array<User> = new Array<User>();
  likeCount : Array<number> = new Array<number>();

  @Input() set movieId(id){
    this.myMovieId=id;    
  }

  ngOnInit() {
    this.reviews=[]
  this.getReview()
    
  this.getMovieImage(this.myMovieId)

  this.calculateLikes()
  }

  getReview(){
    console.log("başladı")
    this.reviewService.getReviewByMovieId(this.myMovieId).subscribe(data=>{
      this.reviews=data     
      this.getUsers(data)        
    }) 
  
  }

  getUsers(data){
    data.map(review => {
      this.userService.getUserById(review.UserId.toString()).subscribe(data=>{
        this.users.push(data[0])
      })
    });
  }

  getMovieImage(movieId:number){
    this.movieService.getMovieById(movieId.toString()).subscribe(data => {
      this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path
    })
  
  }
  getUser(userId : number){
    this.userService.getUserById(userId.toString()).subscribe(data=>{
      this.users=data
    console.log(data)

    })
    console.log(userId)
    console.log(this.users)
  }

  like(reviewId: number ){
    let reviewLike : number  
    
    this.reviewService.getReviewById(reviewId).subscribe(data=>{
      reviewLike=data[0].ReviewLike + 1   
      this.reviewService.updateLikes(reviewId,reviewLike).subscribe(data=>
        console.log(data))  
    })    
   
  
    this.calculateLikes()
   
  }

  disLike(reviewId: number){
    let reviewDislike : number

    console.log(reviewId)
    this.reviewService.getReviewById(reviewId).subscribe(data=>{
      reviewDislike=data[0].ReviewDislike + 1    
      this.reviewService.updateDislikes(reviewId,reviewDislike).subscribe(data=>
        console.log(data))
    })
    
    this.calculateLikes()
    
  }

  calculateLikes(){
    let totalLike 
    this.reviewService.getReviewByMovieId(this.myMovieId).subscribe(data=>{
        data.map(review => {
          totalLike = review.ReviewLike-review.ReviewDislike
          this.likeCount.push(totalLike)          
        })
    })    
  }
}
