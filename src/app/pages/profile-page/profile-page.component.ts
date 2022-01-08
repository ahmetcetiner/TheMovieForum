import { User } from './../../model/users';
import { UserService } from './../../services/user-service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  sendModule: string = 'Favory List';

  constructor( private activatedRoute: ActivatedRoute,
    private userService:UserService) { }

    user : User[]

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getUser(params['userId']);
    });
  }

  getUser(userId){
    this.userService.getUserById(userId).subscribe(data=>{
      this.user=data
    })
  }

  getModule(moduleName) {
    switch (moduleName) {
      case 'Favory List':
        this.sendModule = 'Favory List';
        break;
      case 'Watch List':
        this.sendModule = 'Watch List';
        break;
      case 'Watched List':
        this.sendModule = 'Watched List';
        break;
      default:
        this.sendModule = 'Favory List';
        break;
    }
  }

}
