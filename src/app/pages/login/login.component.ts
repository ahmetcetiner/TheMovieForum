import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user-info';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }
  model: User = new User();

  ngOnInit(): void {
  }
  login(form:NgForm){
    alert(this.model.password+this.model.userName)
  }

}
