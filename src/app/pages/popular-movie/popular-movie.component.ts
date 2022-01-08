import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { PopularMovie } from 'src/app/model/popularMovie';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { BACKDROP_SIZE, IMAGE_BASE_URL } from 'src/config';

@Component({
  selector: 'app-popular-movie',
  templateUrl: './popular-movie.component.html',
  styleUrls: ['./popular-movie.component.scss']
})
export class PopularMovieComponent implements OnInit {

  constructor(private movieService: MovieService) { }

  @Input() movie: Movie = new Movie();
  
  movies: PopularMovie
  imageUrl= IMAGE_BASE_URL+BACKDROP_SIZE
  movieId:number;
  videoId:string
  ngOnInit(): void {
    this.getPopularMovies()
  }
  getPopularMovies(){
    this.movieService.getPopularMovies().subscribe(data=>{
      this.movies=data;
    })
  }
  setMovieId(movieId){
    this.movieId=movieId;
    this.getVideos()
  }

  getVideos() {
    this.movieService.getVideos(this.movieId.toString()).subscribe(data => {
      this.videoId = data.results[0].key;
      console.log(data.results[0].key)
      console.log(this.videoId)
    })
  }
}
