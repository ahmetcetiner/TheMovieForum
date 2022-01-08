import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Discussion } from './../../model/discussion';
import { DiscussionService } from './../../services/discussion-service/discussion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/users';
import { UserService } from 'src/app/services/user-service/user.service';
import { DatePipe } from '@angular/common';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor(private discussionService:DiscussionService,
    private activatedRoute: ActivatedRoute,
    private movieService:MovieService,
    private userService:UserService) { }

  discussions : Discussion[]
  users : Array<User> = new Array<User>();
  datepipe: DatePipe = new DatePipe('en-US');
release_dates: Array<string> = new Array<string>();
backdropImageUrl : string
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getDiscussions(params['movieId']);    
      this.getMovieImage(params['movieId'])      
    });
    
  }

  getDiscussions(movieId){
    this.discussionService.getDiscussionByMovieId(movieId).subscribe(data=>{
      this.discussions=data
      console.log(data)
      this.getDates(data)
    })    
   }

   getMovieImage(movieId:number){
    this.movieService.getMovieById(movieId.toString()).subscribe(data => {
      this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path
    })
  
  }
  
   getDates(data){
    data.map(discussion => {
       let release_date = this.datepipe.transform(
        discussion.CreatedDate,
        'dd/MM/yyyy'
      );     
      this.release_dates.push(release_date)  
    });
  }



}
