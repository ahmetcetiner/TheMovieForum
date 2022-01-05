import { Discussion } from 'src/app/model/discussion';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';
import { HEROKU_API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {

constructor(private httpClient: HttpClient) { }
 /*getDiscussionById(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Discussion>(
      HEROKU_API_URL + 'discussion',
      {headers:headers}
                 
    );
  }*/

  /*getDiscussionByMovieId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Discussion>(
      HEROKU_API_URL + 'moviediscussionAll',
      {headers:headers}
                 
    );
  }*/

  /*getDiscussionByUserId(id: number) {
    let headers = new HttpHeaders();
    let params = new HttpParams();

    const options ={ params: new HttpParams().set('Id', "8")} ;
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    params = params.append('Id',id.toString())
    return this.httpClient.get<Discussion>(
      HEROKU_API_URL + 'discussions',
      {headers:headers}
                 
    );
  }*/

  getDiscussions(): Observable<Discussion[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Discussion[]>(HEROKU_API_URL + 'discussionAll', {
      headers: headers,
    });
  }

  updateDiscussion(discussion: Discussion) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put<Discussion>(HEROKU_API_URL + 'discussion', discussion, {
      headers: headers,
    });
  }

  addDiscussion(discussion: Discussion) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.put<Discussion>(
      HEROKU_API_URL + 'discussion',
      {
        UserId: discussion.UserId,
        Name: discussion.Name,
        MovieId: discussion.MovieId,
        CreatedDate:discussion.CreatedDate
      },
      { headers: headers }
    );
  }
}
