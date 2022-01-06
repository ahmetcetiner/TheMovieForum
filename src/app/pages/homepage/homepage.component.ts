import { UserService } from './../../services/user-service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';
import { idGetter } from 'src/app/app.module';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import { Review } from 'src/app/model/review';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from 'src/app/services/review-service/review.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private reviewService:ReviewService,
    private movieService:MovieService,
    private userService:UserService,) { }

backdropImageUrl : string
reviews : Review[]
reviewId : number
users : Array<User> = new Array<User>();
likeCount : Array<number> = new Array<number>();
imageUrls:Array<string> = new Array<string>()

ngOnInit() {
this.getReviews()
  
}

getReviews(){
  console.log("başladı")
  this.reviewService.getReviews().subscribe(data=>{
    this.reviews=data    
    this.getMovieImage(data) 
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

getMovieImage(data){
  data.map(review => {
    this.movieService.getMovieById(review.MovieId.toString()).subscribe(data=>{
      this.imageUrls.push(IMAGE_BASE_URL + BACKDROP_SIZE + data[0].backdrop_path)
      console.log(data[0].backdrop_path)
    })
  });
  console.log(this.imageUrls)
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
  
}

disLike(reviewId: number){
  let reviewDislike : number

  console.log(reviewId)
  this.reviewService.getReviewById(reviewId).subscribe(data=>{
    reviewDislike=data[0].ReviewDislike + 1    
    this.reviewService.updateDislikes(reviewId,reviewDislike).subscribe(data=>
      console.log(data))
  })
  
  
}



}
