import { ListService } from './../../services/list-service/list.service';
import { idGetter } from 'src/app/app.module';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { List} from 'src/app/model/list';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie-service/movie.service';
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
    @Input() movies: Array<Movie>
  
    imageUrl = IMAGE_BASE_URL + BACKDROP_SIZE;

  ngOnInit(): void {    
  }

}
