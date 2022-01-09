import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private messageService : MessageService) { }
  @Input() messasges: Array<Message>

  _discussionIds="5"

  ngOnInit() {
    this.getMessages()
  }

  getMessages() {
    
  }
}
