import { AlertifyService } from './../alertify-service/alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tokenGetter } from 'src/app/app.module';
import { Discussion } from 'src/app/model/discussion';
import { Message } from 'src/app/model/message';
import { HEROKU_API_URL } from 'src/config';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private httpClient: HttpClient,
  private alertifyService : AlertifyService) { }
getMessageById(id: number) {
    let headers = new HttpHeaders();
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.get<Message>(
      HEROKU_API_URL + 'message/'+id.toString(),
      {headers:headers}                 
    );
  }


    getMessageByDiscussionId(id: string):Observable<Message[]> {
    let headers = new HttpHeaders();   
 
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
  
    return this.httpClient.get<Message[]>(
      HEROKU_API_URL + 'discussionMessages/'+id,
      {headers:headers}
                 
    );
  }

  updateMessage(message: Message) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());
    return this.httpClient.put<Message>(HEROKU_API_URL + 'message', message, {
      headers: headers,
    });
  }

  sendMessage(message: Message) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.post<Message>(
      HEROKU_API_URL + 'message', {
        "UserId": message.UserId,
        "DiscussionId": message.DiscussionId,
        "MessageText": message.MessageText,
        "CreatedDate":message.CreatedDate
      }, { headers: headers }
    ).subscribe(data=>{}, (error)=>{
      this.alertifyService.error("Bir hata oluştu.")
    });
  }

  deleteMessage(messageId:number){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('token', tokenGetter());

    return this.httpClient.delete( HEROKU_API_URL + 'message/'+messageId, { headers: headers })
  }
}
