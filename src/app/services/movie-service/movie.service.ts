import { PopularMovie } from '../../model/popularMovie';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
} from '../../../config';
import { Observable,throwError  } from 'rxjs';
import { Movie } from '../../model/movie';
import { Credits } from '../../model/credit';
import { catchError,tap } from 'rxjs/operators';
import { Video } from '../../model/video';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient : HttpClient) { }
  
  getMovieById(movieId:string):Observable<Movie>{
    return this.httpClient.get<Movie>( API_URL+"movie/"+movieId+"?api_key="+API_KEY).pipe(
      tap(data=>{
      }),
      catchError(this.handleError)
    )
  }

  getActorsByMovieId(movieId:string):Observable<Credits>{
    return this.httpClient.get<Credits>( API_URL+"movie/"+movieId+"/credits?api_key="+API_KEY)   
  }

  getPopularMovies():Observable<PopularMovie>{
    return this.httpClient.get<PopularMovie>( POPULAR_BASE_URL+"&page=1")
  }

  getVideos(movieId:string):Observable<Video>{
    return this.httpClient.get<Video>( API_URL+"movie/"+movieId+"/videos"+"?api_key="+API_KEY+"&language=en-US")
  }

  getBackdropImage():Observable<PopularMovie>{    
    return this.httpClient.get<PopularMovie>(POPULAR_BASE_URL)
  }

  searchMovies(searchTerm:string,page:number){
    return this.httpClient.get<PopularMovie>(SEARCH_BASE_URL+searchTerm+"&page="+page)    
  
}
  
  handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = ' Bir hata oluştu ' + err.error.message;
    } else {
      errorMessage = 'Sistemsel bir hata '+ err.status.toString();
     
    }
    return throwError(errorMessage);
  }


}
