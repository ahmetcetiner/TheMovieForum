import { UserService } from './../user-service/user.service';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

constructor(private userService:UserService) { }
path = "https://ui-avatars.com/api/?name="  


setAvatarUrl(firstName:string,lastName:string){
  return this.path+firstName+"+"+lastName+"&background=random"
}



}
