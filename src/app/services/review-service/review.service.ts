import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';
import { Review } from 'src/app/model/review';
import { HEROKU_API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

constructor(private httpClient : HttpClient) { }


  /*getReviewById(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<User>(
      HEROKU_API_URL + 'review',
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

  updateReview(review: Review){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put<Review>(HEROKU_API_URL + 'review',review, {headers: headers});
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
