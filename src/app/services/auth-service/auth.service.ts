import { LoginResponse } from '../../model/loginResponse';
import { RegisterUser } from '../../model/registerUser';
import { LoginUser } from '../../model/loginUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from '../alertify-service/alertify.service';
import { TOKEN_KEY, HEROKU_API_URL } from '../../../config';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private alertifyService: AlertifyService
  ) {}

  userToken: any;
  jwtHelper = new JwtHelperService();

  login(loginUser: LoginUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');

    return this.httpClient
      .post<LoginResponse>(HEROKU_API_URL + 'login', loginUser, {
        headers: headers,
      })
      .subscribe((data) => {
        this.saveToken(data.token, data.user.Id);
        this.userToken = data['token'];
        this.router.navigateByUrl('/');
        this.alertifyService.success('Sisteme giriş yapıldı.'); 
      }, (error)=>{
        this.alertifyService.error("Kullanıcı adı veya şifre hatalı.")
      });
  }

  register(registerUser: RegisterUser) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.httpClient
      .post(HEROKU_API_URL + 'user', registerUser, { headers: headers })
      .subscribe((data) => {}, (error)=>{
        this.alertifyService.error("Bir hata oluştu.")
      });
      this.alertifyService.success('Sisteme kaydınız yapıldı.');
      this.router.navigateByUrl('/login')
  }

  saveToken(token, id) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('ID', id);
  }

  logOut() {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigateByUrl('/login');
    this.alertifyService.error('Sistemden çıkış yapıldı.');
  }

  loggedIn() {
    return localStorage.getItem(TOKEN_KEY) !== null;
  }

  get token() {
    return localStorage.getItem(TOKEN_KEY);
  }
  getCurrentUser() {
    return this.jwtHelper.decodeToken(localStorage.getItem(TOKEN_KEY)).nameid;
  }  
}
