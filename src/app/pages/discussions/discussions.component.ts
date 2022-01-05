import { Component, OnInit } from '@angular/core';
import { Discussion } from 'src/app/model/discussion';

@Component({
  selector: 'app-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  constructor() { }
  discussions: Array<Discussion> = new Array<Discussion>();
  ngOnInit(): void {
    this.getDiscussions()
    console.log(this.discussions)
  }

  getDiscussions(){
   // this.discussions.push(new Discussion("https://ui-avatars.com/api/?size=128","ahmetcetinerr","02/01/2022","Natashanin kendini feda etmesi.",250))
    //this.discussions.push(new Discussion("https://ui-avatars.com/api/?size=128","ahmetcetinerr","02/01/2022","Natashanin kendini feda etmesi.",250))
  }
}
