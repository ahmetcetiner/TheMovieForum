import { Injectable } from '@angular/core';
import API from '../../API';
import { HttpClient } from "@angular/common/http";
import {
  SEARCH_BASE_URL,
  POPULAR_BASE_URL,
  API_URL,
  API_KEY,
  REQUEST_TOKEN_URL,
  LOGIN_URL,
  SESSION_ID_URL
} from 'src/config';
import { Observable } from 'rxjs';
import { Movie } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient : HttpClient) { }
  
  getMovieById(movieId:string):Observable<Movie>{
    return this.httpClient.get<Movie>( API_URL+"movie/"+movieId+"?api_key="+API_KEY)
   
  }
}
