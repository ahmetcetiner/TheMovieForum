import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HEROKU_API_URL } from 'src/config';
import { tokenGetter } from '../../app.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getUserById(id: number) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    
    return this.httpClient.post(HEROKU_API_URL + 'login', id, {headers: headers});      
  }

  getToken() {
    let token = tokenGetter();
    if (token !== null) return true;
    return false;
  }
}
