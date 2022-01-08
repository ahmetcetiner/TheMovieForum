import { Component, Input, OnInit } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { MovieService } from 'src/app/services/movie-service/movie.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {

  constructor(private movieService: MovieService) { }
  _videoId: string;
  @Input() set videoId(videoId: string) {
    this._videoId = videoId;
  }


  player: YT.Player
  ngOnInit(): void {
    console.log(this._videoId)
  }


}
