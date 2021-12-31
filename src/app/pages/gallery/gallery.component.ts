import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  movies: Array<Movie> = new Array<Movie>();
  movieIds: Array<string> = new Array<string>();

  imagePath: string="";

  ngOnInit(): void {
    this.movieService.getMovieById("624860").subscribe(data => {
      this.imagePath = data.poster_path
    })

    this.movieIds.push("624860");
    this.movieIds.forEach(element => {
      this.getMovies(element);
    });
    console.log(this.movies)
    this.movies.map(movie=>{
      this.imagePath=IMAGE_BASE_URL+BACKDROP_SIZE+movie.backdrop_path
    })
    console.log(IMAGE_BASE_URL)
  }

  getMovies(movieId: string) {
    this.movieService.getMovieById(movieId).subscribe(data => {
      this.movies.push(data)
    })
  }

}
