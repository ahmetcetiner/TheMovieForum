import { UserService } from './../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/users';
import { idGetter } from 'src/app/app.module';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private userService : UserService) { }

  user : User[];

  ngOnInit(): void {
    console.log(idGetter())
    this.userService.getUserById(idGetter()).subscribe(data=>{
      this.user=data
      console.log(data)
    })
  }
  
  getUser(){
    let id = idGetter();
    this.userService.getUserById(id).subscribe(data=>{
      this.user=data
      console.log(data)
    })
  }

}
