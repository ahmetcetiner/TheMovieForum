import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavListInfo } from 'src/app/model/favListInfo';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie.service';
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL, POSTER_SIZE
} from 'src/config';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [MovieService]
})
export class GalleryComponent implements OnInit {

  constructor(private movieService: MovieService,
    private activatedRoute: ActivatedRoute) { }

  @Input() movie: Movie = new Movie();
  @Input() imageUrl: ""
  @Input() backdropImageUrl: ""

  movies: Array<FavListInfo> = new Array<FavListInfo>();
  movieIds: Array<string> = new Array<string>();

  imagePath:Array<string> = new Array<string>();

  ngOnInit(): void {
    this.movieIds.push("624860");
    this.movieIds.push("634649");
    
    this.movieIds.forEach(element => {
      this.getMovies(element);
    });  
    console.log(this.movies)
  }


  getMovies(movieId: string) {
    this.movieService.getMovieById(movieId).subscribe(data => {
      this.imagePath.push(IMAGE_BASE_URL+BACKDROP_SIZE+data.poster_path)
      this.movies.push(new FavListInfo(IMAGE_BASE_URL+BACKDROP_SIZE+data.poster_path,data.title,data.vote_average,data.id))
    })
  }
}
