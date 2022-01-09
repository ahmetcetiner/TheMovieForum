import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import {  YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent implements OnInit {

  constructor(
    private movieService: MovieService ,
  ) {}
  //_videoId: string= "https://www.youtube.com/embed/BdJKm16Co6M"
  _videoId: string= "BdJKm16Co6M"
  //@Input() set videoId(videoId: string) {
 //  this._videoId = videoId;
 // }  

  player:YT.Player;
  videoIcon:string = "./assets/images/icons8_heart.ico";
  play:string = "Play";
  videodisabled:boolean = true;

  ngOnInit() { 

  }

 
}
