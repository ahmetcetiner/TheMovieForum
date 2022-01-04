import { MovieService } from '../../services/movie-service/movie.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
  providers: [MovieService],
})
export class BreadCrumbComponent implements OnInit {
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  //movieTitle: string;

  @Input() movieTitle = '';

  async ngOnInit() {
  }

}
