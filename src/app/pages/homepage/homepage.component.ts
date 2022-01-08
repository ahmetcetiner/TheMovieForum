import { AuthService } from './../../services/auth-service/auth.service';
import { UserService } from './../../services/user-service/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';
import { idGetter } from 'src/app/app.module';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import { Review } from 'src/app/model/review';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { ReviewService } from 'src/app/services/review-service/review.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private reviewService:ReviewService,
    private movieService:MovieService,
    private userService:UserService,
    private authService: AuthService) { }

backdropImageUrl : string
reviews : Review[]
reviewId : number
users : Array<User> = new Array<User>();
likeCount : Array<number> = new Array<number>();
imageUrls:Array<string> = new Array<string>()
datepipe: DatePipe = new DatePipe('en-US');
release_dates: Array<string> = new Array<string>();

numberDizi : Array<number> = new Array<number>();

ngOnInit() {
this.getReviews()


}

getReviews(){
  this.reviewService.getReviews().subscribe(data=>{
    this.reviews=data 
    console.log(data)
    this.getDates(data)
    this.getMovieImage( this.reviews) 
    this.getUsers( this.reviews)    
  })  
}

setModel(){
console.log(this.users)
}

getDates(data){
  console.log(data)
  data.map(review => {
   
     let release_date = this.datepipe.transform(
      review.CreatedDate,
      'dd/MM/yyyy'
    );    
    this.release_dates.push(release_date)   
    
  });
}
getUsers(data){
  console.log( data)
  data.map(review => {
    console.log(review.UserId)
    this.numberDizi.push(review.UserId)   
  });

  for(let i=0;i<this.numberDizi.length;i++){

    this.userService.getUserById(this.numberDizi[i].toString()).subscribe(data=>{
      console.log(this.numberDizi[i])
      this.users.push(data[0])      
    })
  }
  console.log(this.users)
  console.log(this.numberDizi)
}

getMovieImage(data){
  console.log(data)
  data.map(review => {
    this.movieService.getMovieById(review.MovieId.toString()).subscribe(data=>{
      this.imageUrls.push(IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path)
      
    })
   
  });
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

loggedIn(){
return  this.authService.loggedIn()
}



}
