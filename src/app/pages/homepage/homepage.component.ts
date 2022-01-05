import { UserService } from './../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private userService : UserService) { }

  user : User;

  ngOnInit(): void {
    /*this.userService.getUserById(8).subscribe(data=>{
      this.user=data
      console.log(data)
    })*/
  }

}
