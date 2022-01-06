import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/users';
import { HEROKU_API_URL } from 'src/config';
import { tokenGetter } from '../../app.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserById(id: string) {
    let headers = new HttpHeaders();
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<User[]>(
      HEROKU_API_URL + 'user/'+id,
      {headers:headers}
                 
    );
  }

  getUsers(): Observable<User[]> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<User[]>(HEROKU_API_URL + 'userAll', {
      headers: headers,
    });
  }

  updateUser(user: User){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put<User>(HEROKU_API_URL + 'user',user, {headers: headers});
  }

 /* deleteUser(user: User){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.delete<User>(HEROKU_API_URL + 'user',user, {headers: headers});
  }*/


  getToken() {
    let token = tokenGetter();
    if (token !== null) return true;
    return false;
  }
}
