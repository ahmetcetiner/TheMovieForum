import { MovieService } from 'src/app/services/movie-service/movie.service';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion-service/discussion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/users';
import { DatePipe } from '@angular/common';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { idGetter } from 'src/app/app.module';


@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor(private discussionService:DiscussionService,
    private activatedRoute: ActivatedRoute,
    private movieService:MovieService,
    private formBuilder: FormBuilder) { }

  discussions : Discussion[]
  users : Array<User> = new Array<User>();
  datePipe: DatePipe = new DatePipe('en-US');
  release_dates: Array<string> = new Array<string>();
  backdropImageUrl : string

  movieId: number;
  discussionInput: boolean;
  discussionsName: string;

  discussionForm: FormGroup;
  discussion: Discussion = new Discussion();

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getDiscussions(params['movieId']);    
      this.getMovieImage(params['movieId'])   
      this.movieId= params['movieId']
    });
    this.createDiscussionForm();
    
  }

  createDiscussionForm() {
    this.discussionForm = this.formBuilder.group({     
      Name: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  getDiscussionArea(discussionInput: boolean) {
    this.discussionInput = discussionInput;

  }

  setModel() {
    this.discussion.UserId = Number(idGetter());
    this.discussion.MovieId = this.movieId;
    this.discussion.Name = this.discussionForm.controls['Name'].value;

    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
    this.discussion.CreatedDate = date;
  }

  
  newDiscussion() {
    if (this.discussionForm.valid) {
      this.setModel();
      this.discussionService.addDiscussion(this.discussion);
    }
    setTimeout(() => {
      window.location.reload()
    }, 220)
  }

  getDiscussions(movieId){
    this.discussionService.getDiscussionByMovieId(movieId).subscribe(data=>{
      this.discussions=data
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
       let release_date = this.datePipe.transform(
        discussion.CreatedDate,
        'dd/MM/yyyy'
      );     
      this.release_dates.push(release_date)  
    });
  }



}
