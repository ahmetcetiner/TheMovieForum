import { LoginResponse } from './../model/loginResponse';
import { RegisterUser } from '../model/registerUser';
import { LoginUser } from '../model/loginUser';
import { Injectable } from '@angular/core';
import { User } from '../model/users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService  } from "@auth0/angular-jwt";
import { AlertifyService } from './alertify.service';
import { TOKEN_KEY } from 'src/config';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService,
  ) {}

  path = 'https://the-movie-forum.herokuapp.com/';
  userToken: any;
  decodedToken: any;
  jwtHelper= new JwtHelperService();

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post<LoginResponse>(this.path+'login', loginUser, { headers: headers })
      .subscribe((data) => {
        this.saveToken(data.token);
        this.userToken = data['token'];
       // this.decodedToken = this.jwtHelper.decodeToken(data['token']);
        this.router.navigateByUrl('/');
        this.alertifyService.success('Sisteme giriş yapıldı.');
      });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(this.path + 'user', registerUser, { headers: headers })
      .subscribe((data) => {});
  }

  saveToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  logOut() {    
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl("/")
    this.alertifyService.error('Sistemden çıkış yapıldı.');
  }

  loggedIn() {   
   return localStorage.getItem(TOKEN_KEY) !==  null;
  }

  get token(){
    return localStorage.getItem(TOKEN_KEY);
  }
  getCurrentUser(){
    return this.jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY)).nameid;
  }



}
