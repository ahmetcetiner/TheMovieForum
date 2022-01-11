import { MovieService } from '../../services/movie-service/movie.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss'],
  providers: [MovieService],
})
export class BreadCrumbComponent implements OnInit {
  constructor(
  ) {}

  @Input() movieTitle = '';

  async ngOnInit() {
  }

}
