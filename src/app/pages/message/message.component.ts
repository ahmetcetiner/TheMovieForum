import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { idGetter } from 'src/app/app.module';
import { Message } from 'src/app/model/message';
import { MessageService } from 'src/app/services/message-service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  constructor(private messageService : MessageService,
    private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,) { }

  @Input() messasges: Array<Message>

  datePipe: DatePipe = new DatePipe('en-US');

  
  movieId: number;
  discussionId : number
  messageInput: boolean;
  messageText: string;
  messageTitle: string;

  messageForm: FormGroup;
  message: Message = new Message();

  model: Message = new Message();

  ngOnInit() {
    this.createMessageForm();
    this.activatedRoute.params.subscribe((params) => {   
      this.movieId=params['movieId']
      this.discussionId=params['discussionId']
    });
  }

  createMessageForm() {
    this.messageForm = this.formBuilder.group({      
      Text: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  getMessageArea(messageInput: boolean) {
    this.messageInput = messageInput;
  }

  setModel() {
    this.message.UserId = Number(idGetter());
    this.message.DiscussionId = this.discussionId;
    this.message.MessageText = this.messageForm.controls['Text'].value;
   

    let date = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm');
    this.message.CreatedDate = date;
  }

  sengMessage() {
    if (this.messageForm.valid) {
      this.setModel();
      this.messageService.sendMessage(this.message);
    }
    setTimeout(() => {
      window.location.reload()
    }, 200)
  }

}
