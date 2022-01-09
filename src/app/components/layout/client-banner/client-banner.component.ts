import { idGetter } from 'src/app/app.module';
import { UserService } from '../../../services/user-service/user.service';
import { AuthService } from '../../../services/auth-service/auth.service';
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
  userId : string
  serchText:string;
  ngOnInit(): void {

    this.setUserId()
  }

  get isAuthenticated() {
    return this.authService.loggedIn();
  }
  logOut() {
    this.authService.logOut();
  }
  getSerch(){
    alert(this.serchText)
  }

  setUserId(){
    this.userId=idGetter();
  }
}
