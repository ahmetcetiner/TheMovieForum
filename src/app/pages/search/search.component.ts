import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/services/movie-service/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private movieService: MovieService,
    private activatedRoute: ActivatedRoute,) { }

  movies: Array<Movie> = new Array<Movie>()
  pageValue: number = 1
  serchText: string
  searchPage: number
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getMovie(params['serchText'], this.pageValue);
      this.serchText = params['serchText']
      this.pageValue=1
    });

  }

  getMovie(serchText: string, pageValue: number) {
    this.movieService.searchMovies(serchText, pageValue).subscribe(data => {
      this.movies = data.results
      this.searchPage = data.total_pages
    })
  }

  getNewPage() {
    if (this.pageValue < this.searchPage) {
      this.pageValue += 1
      this.getMovie(this.serchText, this.pageValue)
    }
  }
  getOldPage() {
    if (this.pageValue > 1) {
    this.pageValue -= 1
    this.getMovie(this.serchText, this.pageValue)
    }
  }
}
