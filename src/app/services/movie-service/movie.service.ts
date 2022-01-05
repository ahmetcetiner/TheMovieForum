import { PopularMovie } from '../../model/popularMovie';
import { Injectable } from '@angular/core';
import API from '../../../API';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL
} from 'src/config';
import { Observable,throwError  } from 'rxjs';
import { Movie } from '../../model/movie';
import { Credits } from '../../model/credit';
import { stringify } from 'querystring';
import { catchError,tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient : HttpClient) { }
  
  getMovieById(movieId:string):Observable<Movie>{
    return this.httpClient.get<Movie>( API_URL+"movie/"+movieId+"?api_key="+API_KEY).pipe(
      tap(data=>{
        console.log(JSON.stringify(data))
      }),
      catchError(this.handleError)
    )   
  }

  getActorsByMovieId(movieId:string):Observable<Credits>{
    return this.httpClient.get<Credits>( API_URL+"movie/"+movieId+"/credits?api_key="+API_KEY)   
  }

  getBackdropImage():Observable<PopularMovie>{    
    return this.httpClient.get<PopularMovie>(POPULAR_BASE_URL)
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
