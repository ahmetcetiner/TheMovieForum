import { Actor } from 'src/app/model/actor';
import { Component, Input, OnInit } from '@angular/core';
import {
  BACKDROP_SIZE,
  IMAGE_BASE_URL, POSTER_SIZE
} from 'src/config';


@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  constructor() { }

  @Input() set takenActor(actor:Actor){
    this.actor=actor
    if(actor.profile_path==null)
      this.actorImage="https://react-app-by-arslan.netlify.app/static/media/no_image.22d2aa4d.jpg"
    else
      this.actorImage=IMAGE_BASE_URL+POSTER_SIZE+actor.profile_path
  } 
  
  actor : Actor
  actorImage : string
  
  
  ngOnInit() {
  }

}
