import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/model/comment';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  myMovieId: number;
  backdropImageUrl: string;
  reviewInput: boolean;
  reviewText: Text;
  reviewTitle: string;

  @Input() set movieId(id) {
    this.myMovieId = id;
  }
  comments: Array<Comment> = new Array<Comment>();
  ngOnInit(): void {
    this.movieService.getMovieById(this.myMovieId.toString()).subscribe(data => {
      this.backdropImageUrl = IMAGE_BASE_URL + BACKDROP_SIZE + data.backdrop_path
    })
    this.getComments()
    this.getReviewArea(this.reviewInput)
  }

  getComments() {
    this.comments.push(new Comment("https://ui-avatars.com/api/?size=128", "ahmetcetinerr", "02/01/2022", "Natashanin kendini feda etmesi.", 250, "Some quick example text to build on the card title and make up the bulk of the cards content."))
    this.comments.push(new Comment("https://ui-avatars.com/api/?size=128", "ahmetcetinerr", "02/01/2022", "Natashanin kendini feda etmesi.", 250, "Some quick example text to build on the card title and make up the bulk of the cards content."))
  }
  getReviewArea(reviewInput: boolean) {
    this.reviewInput = reviewInput;
  }
  reviewAdd() {
    alert(this.reviewText+this.reviewTitle);
  }

}
