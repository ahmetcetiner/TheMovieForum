import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Discussion } from 'src/app/model/discussion';
import { DiscussionService } from 'src/app/services/discussion-service/discussion.service';

@Component({
  selector: 'app-discussion-message',
  templateUrl: './discussion-message.component.html',
  styleUrls: ['./discussion-message.component.scss']
})
export class DiscussionMessageComponent implements OnInit {

  constructor(private discussionService: DiscussionService, private activatedRoute: ActivatedRoute) { }
  discussions: Array<Discussion> = new Array<Discussion>();
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
  }
}
