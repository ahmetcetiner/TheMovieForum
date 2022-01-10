import { Component, Input, OnInit } from '@angular/core';
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

  
  movies: PopularMovie
  imageUrl= IMAGE_BASE_URL+BACKDROP_SIZE
  movieId:number;
  videoId:string
  play:string = "Play";
  videodisabled:boolean = false;
  ngOnInit(): void {
    this.getPopularMovies()
  }
  getPopularMovies(){
    this.movieService.getPopularMovies().subscribe(data=>{
      this.movies=data;
    })
  }
  setMovieId(movieId){
    this.videodisabled=false
    this.movieId=movieId;
    this.getVideos()
  }

  getVideos() {
    this.movieService.getVideos(this.movieId.toString()).subscribe(data => {
      this.selectTrailer(data.results)   
    })
  }
  selectTrailer(results){
    for(let i =0;i<results.length;i++){
      if(results[i].type == "Trailer"){
        this.videoId=results[i].key
        break;
      }else{
        this.videoId=results[0].key
      }
    }     
}
  changeState(){
    this.videodisabled=true
  }
}
