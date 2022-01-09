import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discussion } from 'src/app/model/discussion';
import { Message } from 'src/app/model/message';
import { DiscussionService } from 'src/app/services/discussion-service/discussion.service';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
  selector: 'app-discussion-message',
  templateUrl: './discussion-message.component.html',
  styleUrls: ['./discussion-message.component.scss']
})
export class DiscussionMessageComponent implements OnInit {

  constructor(private discussionService: DiscussionService, 
    private activatedRoute: ActivatedRoute, 
    private messageService: MessageService) { }
  discussions: Array<Discussion> = new Array<Discussion>();
  messasges:Message[];
  discussionId: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getDiscussions(params['movieId']);
    });
  }

  getDiscussions(movieId) {
    this.discussionService.getDiscussionByMovieId(movieId).subscribe(data => {
      this.discussions = data;
    })
  }
  setDiscussionId(discussionId) {
    this.discussionId = discussionId
    this.messageService.getMessageByDiscussionId(this.discussionId).subscribe(data=>{
      this.messasges=data
    })
  }
}
