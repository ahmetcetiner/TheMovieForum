import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';
import { Review } from 'src/app/model/review';
import { HEROKU_API_URL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private httpClient: HttpClient) {}

  /*getReviewById(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Review>(
      HEROKU_API_URL + 'review',
      {headers:headers}
                 
    );
  }*/

  /*getReviewByMovieId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Review>(
      HEROKU_API_URL + 'movieReviewAll',
      {headers:headers}
                 
    );
  }*/

  /*getReviewByUserId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Review>(
      HEROKU_API_URL + 'reviews',
      {headers:headers}
                 
    );
  }*/

  getReviews(): Observable<Review[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Review[]>(HEROKU_API_URL + 'reviewAll', {
      headers: headers,
    });
  }

  updateReview(review: Review) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put<Review>(HEROKU_API_URL + 'review', review, {
      headers: headers,
    });
  }

  addReview(review: Review) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.put<Review>(
      HEROKU_API_URL + 'review',
      {
        UserId: review.UserId,
        Title: review.Title,
        MovieId: review.MovieId,
        MessageText: review.MessageText,
        ReviewLike: review.ReviewLike,
        ReviewDislike:review.ReviewDislike,
        CreatedDate:review.CreatedDate
      },
      { headers: headers }
    );
  }

  /* deletReview(review: Review){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.delete<Review>(HEROKU_API_URL + 'review',user, {headers: headers});
  }*/

  getToken() {
    let token = tokenGetter();
    if (token !== null) return true;
    return false;
  }
}
