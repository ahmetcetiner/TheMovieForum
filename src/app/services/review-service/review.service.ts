import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HEROKU_API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

constructor(private httpClient : HttpClient) { }



}
