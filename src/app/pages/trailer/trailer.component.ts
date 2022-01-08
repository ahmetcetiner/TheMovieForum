import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MovieService } from 'src/app/services/movie-service/movie.service';
import { YtPlayerService } from 'yt-player-angular';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent implements OnInit {

  constructor(
    private movieService: MovieService,
  ) {}
  _videoId: string;

  @Input() set videoId(videoId: string) {
    this._videoId = videoId;
  }  
  ngOnInit() { 
  
  }
 player : YouTubePlayer
  onReady() {
    this.player.mute();         
    this.player.playVideo();    
  }

  // Loop
  onStateChange(event) {
    if (event.data === 0) {
      this.player.playVideo();  
    }
  }
 
  ngOnDestroy(){
    this.player.ngOnDestroy()
  }
  deneme() {
   // this.player.pauseVideo();
  }
}
