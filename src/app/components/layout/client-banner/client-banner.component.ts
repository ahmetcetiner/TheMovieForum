import { UserService } from './../../../services/user.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-banner',
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.scss'],
})
export class ClientBannerComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}
    serchText:string;
  ngOnInit(): void {
    console.log(this.authService.loggedIn());
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
  logOut() {
    this.authService.logOut();
  }
  getSerch()
  {
    alert(this.serchText)
  }
}
